import Button from "@shared/ui/Button";
import FileDropInput from "@shared/ui/FileDropInput";
import { Input } from "@shared/ui/Input";
import type { CarouselItem } from "@shared/ui/ui.types";
import { cx } from "@shared/utils/cx";
import { useState, type SyntheticEvent } from "react";

interface IAddEditModal {
  show: boolean;
  onClose: () => void;
  defaultData?: CarouselItem;
}

export default function AddEditMovieModal({
  show,
  onClose,
  defaultData
}: IAddEditModal) {
  const isEdit = !!defaultData
  const defaultForm: CarouselItem = {
    id: "",
    title: "",
    thumbnail: "",
    thumbnailFile: undefined,
    trailer: ""
  }

  const [form, setForm] = useState<CarouselItem>(defaultForm)
  const handleChangeForm = (name: string, value: string | File) => {
    setForm(prev => {
      return {
        ...prev,
        [name]: value
      }
    })
  }

  const handleSubmit = (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!isEdit) {
      const existingList = JSON.parse(localStorage.getItem("newReleaseList") ?? "[]")
      const newList = [...existingList, form]
      localStorage.setItem("newReleaseList", JSON.stringify(newList))
    }

    setForm(defaultForm)
    onClose()

  }

  return (
    <div className={cx(
      show ? "fixed z-100 h-screen w-screen grid place-items-center bg-hero-gradient" : "hidden"
    )}
      style={{ background: "rgba(0, 0, 0, 0.5)" }}
    >
      <div className=" max-h-[80vh] overflow-auto bg-[#181A1CD6] w-76.5 max-w-[90vw] p-6 rounded-xl text-light-primary flex flex-col md:w-100 md:p-8 lg:w-132.25 lg:p-10 lg:rounded-2xl transition-all ease-in">
        <h1 className="text-[18px] leading-[140%] font-bold mb-5 md:text-[24px] lg:text-[32px] lg:mb-7">Tambah Film/Series</h1>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <Input
            type="text"
            label="Judul Film/Series"
            placeholder="Masukkan judul film/series"
            value={form.title}
            onChange={(e) => handleChangeForm("title", e.target.value)}
            required
          />
          <Input
            type="text"
            label="Link Trailer"
            placeholder="Masukkan link trailer"
            value={form.trailer}
            onChange={(e) => handleChangeForm("trailer", e.target.value)}
            required
          />
          <FileDropInput
            label="Thumbnail"
            accept="image/*"
            onFilesSelected={(files) => {
              const file = files[0]
              handleChangeForm("thumbnailFile", file)
              handleChangeForm("thumbnail", URL.createObjectURL(file))
            }}
            required
          />
          {
            form.thumbnailFile
            &&
            <div className="flex items-center gap-2">
              <img src={form.thumbnail} className="h-16 w-16 object-cover" />
              <span className="text-[10px]">{form.thumbnailFile.name}</span>
            </div>
          }
          <div className="grid grid-cols-2 gap-2 mt-4">
            <Button onClick={onClose} variant="outlined" className="h-8! md:h-10! lg:h-12!">
              Batal
            </Button>
            <Button type="submit" variant="secondary" className="h-8! md:h10! lg:h-12!">
              Simpan
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}