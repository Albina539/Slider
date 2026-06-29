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
import type { Slide } from "../../types";

interface EditDialogProps {
  children: React.ReactNode;
  slideData: Slide;
  onUpdate: (slideNo: number, value: Partial<Slide>) => void;
}

const EditDialog = ({ children, slideData, onUpdate }: EditDialogProps) => {
  const [localData, setLocalData] = useState(slideData);
  const [openDialog, setOpenDialog] = useState(false);
  const handleChange = (field: keyof Slide, value: string) => {
    setLocalData({ ...localData, [field]: value });
  };

  const handleUpdate = () => {
    onUpdate(slideData.slideNo, localData);
    setOpenDialog(false);
  };
  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent className="bg-slider-green">
        <DialogHeader>
          <DialogTitle className="text-2xl border-b border-black">
            Редактирование слайда
          </DialogTitle>
          <DialogDescription>
            <div>
              <div className="mb-4">
                <label className="text-xl text-black">Название</label>
                <Input
                  className="bg-white border-2 border-black text-black"
                  placeholder="Название слайда"
                  value={localData.slideTitle}
                  onChange={(e) => handleChange("slideTitle", e.target.value)}
                />
              </div>
              <div>
                <label className="text-xl text-black">Контент</label>
                <Textarea
                  className="bg-white border-2 border-black text-black"
                  placeholder="Текст презентации"
                  value={localData.content}
                  onChange={(e) => handleChange("content", e.target.value)}
                />
              </div>
            </div>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose>
            <Button className="cursor-pointer">Назад</Button>
          </DialogClose>
          <Button
            className="bg-slider-dark cursor-pointer"
            onClick={handleUpdate}
          >
            Сохранить
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditDialog;
