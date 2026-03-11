from pathlib import Path
import os, random
from glob import glob

import numpy as np
from PIL import Image

import torch
import torch.nn as nn
from torch.utils.data import Dataset, DataLoader
from sklearn.model_selection import train_test_split
from sklearn.utils.class_weight import compute_class_weight

import albumentations as A
from albumentations.pytorch import ToTensorV2
from efficientnet_pytorch import EfficientNet

device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
print("Device:", device)

# ---- PATHS ----
DATA_DIR = Path(r"C:\Users\athar\OneDrive\Documents\medical AI\isic2019")

CLASS_NAMES = ["AK", "BCC", "BKL", "DF", "MEL", "NV", "SCC", "VASC"]
num_classes = len(CLASS_NAMES)
class_to_idx = {c: i for i, c in enumerate(CLASS_NAMES)}

# collect (image_path, label_idx)
samples = []
for cname in CLASS_NAMES:
    folder = DATA_DIR / cname
    paths = glob(str(folder / "*.jpg")) + glob(str(folder / "*.JPG")) + glob(
        str(folder / "*.png")
    )
    idx = class_to_idx[cname]
    for p in paths:
        samples.append((p, idx))

print("Total images:", len(samples))

train_samples, val_samples = train_test_split(
    samples,
    test_size=0.2,
    stratify=[y for _, y in samples],
    random_state=42,
)

# ---- DATASET ----
train_tf = A.Compose(
    [
        A.Resize(224, 224),
        A.HorizontalFlip(p=0.5),
        A.VerticalFlip(p=0.5),
        A.RandomBrightnessContrast(p=0.3),
        A.ShiftScaleRotate(
            shift_limit=0.05, scale_limit=0.1, rotate_limit=30, p=0.5
        ),
        A.Normalize(
            mean=(0.485, 0.456, 0.406), std=(0.229, 0.224, 0.225)
        ),
        ToTensorV2(),
    ]
)

val_tf = A.Compose(
    [
        A.Resize(224, 224),
        A.Normalize(
            mean=(0.485, 0.456, 0.406), std=(0.229, 0.224, 0.225)
        ),
        ToTensorV2(),
    ]
)


class ISICFolderDataset(Dataset):
    def __init__(self, items, tfm):
        self.items = items
        self.tfm = tfm

    def __len__(self):
        return len(self.items)

    def __getitem__(self, idx):
        img_path, label = self.items[idx]
        img = np.array(Image.open(img_path).convert("RGB"))
        aug = self.tfm(image=img)
        x = aug["image"]
        return x, label


train_ds = ISICFolderDataset(train_samples, train_tf)
val_ds = ISICFolderDataset(val_samples, val_tf)

BATCH_SIZE = 16  # drop to 8 if GPU OOM
# IMPORTANT: num_workers = 0 on Windows to avoid multiprocessing error
train_loader = DataLoader(
    train_ds, batch_size=BATCH_SIZE, shuffle=True, num_workers=0
)
val_loader = DataLoader(
    val_ds, batch_size=BATCH_SIZE, shuffle=False, num_workers=0
)

# ---- CLASS WEIGHTS ----
y_train = np.array([y for _, y in train_samples])
class_weights = compute_class_weight(
    "balanced", classes=np.arange(num_classes), y=y_train
)
class_weights = torch.tensor(class_weights, dtype=torch.float32).to(device)

# ---- MODEL ----
model = EfficientNet.from_pretrained("efficientnet-b4", num_classes=num_classes)
model = model.to(device)

criterion = nn.CrossEntropyLoss(weight=class_weights)
optimizer = torch.optim.AdamW(model.parameters(), lr=1e-4)
scheduler = torch.optim.lr_scheduler.ReduceLROnPlateau(
    optimizer, mode="max", factor=0.5, patience=2
)


# ---- TRAIN LOOP ----
def run_epoch(loader, train=True):
    if train:
        model.train()
    else:
        model.eval()
    total_loss, correct, total = 0.0, 0, 0

    for xb, yb in loader:
        xb = xb.to(device)
        yb = torch.tensor(yb).to(device)

        if train:
            optimizer.zero_grad()

        with torch.set_grad_enabled(train):
            logits = model(xb)
            loss = criterion(logits, yb)
            if train:
                loss.backward()
                optimizer.step()

        total_loss += loss.item() * xb.size(0)
        preds = logits.argmax(dim=1)
        correct += (preds == yb).sum().item()
        total += xb.size(0)

    return total_loss / total, correct / total


def main():
    best_val_acc = 0.0
    EPOCHS = 10

    for epoch in range(1, EPOCHS + 1):
        train_loss, train_acc = run_epoch(train_loader, train=True)
        val_loss, val_acc = run_epoch(val_loader, train=False)
        scheduler.step(val_acc)

        print(
            f"Epoch {epoch}: "
            f"train_loss={train_loss:.4f}, train_acc={train_acc:.3f}, "
            f"val_loss={val_loss:.4f}, val_acc={val_acc:.3f}"
        )

        global model
        if val_acc > best_val_acc:
            best_val_acc = val_acc
            torch.save(model.state_dict(), "skin_model.pt")
            print(">> Saved new best model, val_acc =", best_val_acc)


if __name__ == "__main__":
    main()
