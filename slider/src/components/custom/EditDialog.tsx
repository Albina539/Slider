import { useState } from "react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import type { SlideContent } from "../../types";

interface EditDialogProps {
  children: React.ReactNode;
  slideData: SlideContent;
  onUpdate: (slideNo: string, value: Partial<SlideContent>) => void;
}

const EditDialog = ({ children, slideData, onUpdate }: EditDialogProps) => {
  const [localData, setLocalData] = useState(slideData);
  const [openDialog, setOpenDialog] = useState(false);
  const handleChange = (field: keyof SlideContent, value: string) => {
    setLocalData({ ...localData, [field]: value });
  };

  const handleUpdate = () => {
    onUpdate(slideData.slideNo, localData);
    setOpenDialog(false);
  };
  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Редактирование слайда</DialogTitle>
          <DialogDescription>
            <div>
              <div className="mb-4">
                <label>Название</label>
                <Input
                  placeholder="Название слайда"
                  value={localData.slidePoint}
                  onChange={(e) => handleChange("slidePoint", e.target.value)}
                />
              </div>
              <div>
                <label>Контент</label>
                <Textarea
                  placeholder="Текст презентации"
                  value={localData.outline}
                  onChange={(e) => handleChange("outline", e.target.value)}
                />
              </div>
            </div>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose>
            <Button>Назад</Button>
          </DialogClose>
          <Button onClick={handleUpdate}>Сохранить</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditDialog;
