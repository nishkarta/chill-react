import { addMovie, updateMovie } from "@features/admin/adminThunk";
import { makeRandomString } from "@shared/helpers/makeRandomString";
import { omitKeys } from "@shared/helpers/omitKeys";
import { useAppDispatch } from "@shared/hooks/redux";
import { uploadThumbnail } from "@shared/services/newRelease.service";
import Button from "@shared/ui/Button";
import FileDropInput from "@shared/ui/FileDropInput";
import { Input } from "@shared/ui/Input";
import { TextArea } from "@shared/ui/TextAreaInput";
import type { CarouselItem } from "@shared/ui/ui.types";
import { cx } from "@shared/utils/cx";
import { useEffect, useMemo, useState, type SyntheticEvent } from "react";

interface IAddEditModal {
  show: boolean;
  onClose: () => void;
  defaultData?: CarouselItem;
}

export default function AddEditMovieModal({
  show,
  onClose,
  defaultData,

}: IAddEditModal) {
  const isEdit = !!defaultData;
  const dispatch = useAppDispatch()

  const defaultForm: CarouselItem = useMemo(() => {
    return {
      id: defaultData?.id || makeRandomString(5),
      title: defaultData?.title || "",
      isNewEpisode: defaultData?.isNewEpisode ?? true,
      description: defaultData?.description || "",
      thumbnail: defaultData?.thumbnail || "",
      thumbnailFile: undefined,
      trailer: defaultData?.trailer || ""
    };
  }, [defaultData]);

  const [form, setForm] = useState<CarouselItem>(defaultForm);

  const handleChangeForm = (name: string, value: string | File) => {
    setForm((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    let thumbnailUrl = "";

    if (form?.thumbnailFile) {
      thumbnailUrl = await uploadThumbnail(form?.thumbnailFile);
    }

    console.log(thumbnailUrl, "fdfa")

    const payload = {
      ...omitKeys(form, ["thumbnailFile", "id"]),
      thumbnail: thumbnailUrl || form?.thumbnail || ""
    } as Omit<CarouselItem, "id" | "thumbnailFile">;

    if (!isEdit) {

      dispatch(addMovie(payload))
    } else {
      dispatch(updateMovie({
        id: String(defaultForm?.id), payload
      }))
    }

    onClose();
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setForm(defaultForm);
  }, [defaultForm, show]);

  return (
    <div
      className={cx(
        show ? "fixed z-100 h-screen w-screen grid place-items-center" : "hidden"
      )}
      style={{ background: "rgba(0, 0, 0, 0.5)" }}
    >
      <div className="max-h-[80vh] overflow-auto bg-[#181A1CD6] w-76.5 max-w-[90vw] p-6 rounded-xl text-light-primary flex flex-col md:w-100 md:p-8 lg:w-132.25 lg:p-10 lg:rounded-2xl transition-all ease-in">
        <h1 className="text-[18px] leading-[140%] font-bold mb-5 md:text-[24px] lg:text-[32px] lg:mb-7">
          {isEdit ? "Edit Film/Series" : "Tambah Film/Series"}
        </h1>

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

          <TextArea
            label="Deskripsi"
            placeholder="Masukkan deskripsi"
            value={form.description}
            onChange={(e) => handleChangeForm("description", e.target.value)}
            required
          />

          <FileDropInput
            label="Thumbnail"
            accept="image/*"
            onFilesSelected={(files) => {
              const file = files[0];
              if (!file) return;

              handleChangeForm("thumbnailFile", file);
              handleChangeForm("thumbnail", URL.createObjectURL(file));
            }}
            required={!isEdit}
          />

          {form.thumbnail && (
            <div className="flex items-center gap-2">
              <img src={form.thumbnail} className="h-16 w-16 object-cover" />
              <span className="text-[10px]">
                {form?.thumbnailFile?.name || "Current thumbnail"}
              </span>
            </div>
          )}

          <div className="grid grid-cols-2 gap-2 mt-4">
            <Button
              type="button"
              onClick={onClose}
              variant="outlined"
              className="h-8! md:h-10! lg:h-12!"
            >
              Batal
            </Button>

            <Button
              type="submit"
              variant="secondary"
              className="h-8! md:h-10! lg:h-12!"
            >
              Simpan
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}