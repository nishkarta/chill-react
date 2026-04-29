import { fetchMovies, removeMovie } from "@features/admin/adminThunk";
import AddEditMovieModal from "@features/admin/widgets/AddEditMovieModal";
import { useAppDispatch, useAppSelector } from "@shared/hooks/redux";
import Header from "@shared/layout/Header";
import Button from "@shared/ui/Button";
import Icon from "@shared/ui/Icon";
import { type CarouselItem } from "@shared/ui/ui.types";
import { cx } from "@shared/utils/cx";
import { useEffect, useState } from "react";

export default function AdminPage() {
  const dispatch = useAppDispatch()
  const { list, loading } = useAppSelector(
    (state) => state.admin
  )
  const [showAdd, setShowAdd] = useState(false)
  const [dataToEdit, setDataToEdit] = useState<CarouselItem>()


  useEffect(() => {
    dispatch(fetchMovies())
  }, [dispatch])

  const handleDelete = async (id: string) => {
    dispatch(removeMovie(id))
  }

  console.log(loading, "loading")
  return (
    <section className="bg-header h-screen flex flex-col">
      <Header />
      <main className="grow flex flex-col gap-8 text-white py-5 *:w-full *:px-5.5 md:*:px-10 lg:*:px-20">
        <div className="flex items-center gap-4">
          <h3 className="grow text-left text-[20px] md:text-[24px] lg:text-[32px]">List Film/Series Terbaru</h3>
          <Button onClick={() => setShowAdd(true)} variant="outlined" className="h-6! w-6! p-0! rounded-[50%] text-[16px]! border-2! md:text-[20px]! md:w-8! md:h-8! lg:text-[24px]! lg:h-10! lg:w-10!">
            +
          </Button>
        </div>
        <div className={cx(
          !!list?.length && "grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4"
        )}>
          {
            list?.length
              ?
              list?.map((each, i) => (
                <div key={i} className="relative border-[0.53px] border-neutral-200 text-left rounded-md overflow-clip">
                  <div className="bg-white absolute right-2 top-2 flex items-center p-2 gap-3 rounded-sm *:cursor-pointer *:opacity-70 *:hover:opacity-100">
                    <Icon icon="pencil" color="black" size={14} onClick={() => setDataToEdit(each)} />
                    <Icon icon="trash" color="red" size={14} onClick={() => handleDelete(`${each?.id}`)} />
                  </div>
                  <img className="h-40 bg-neutral-200 w-full object-cover" src={each?.thumbnail} />
                  <div className="p-4">
                    <h5 className="text-[16px] font-bold">{each?.title}</h5>
                    <p className="text-[12px] text-neutral-500 line-clamp-2 lg:line-clamp-3">{each?.description}</p>
                  </div>
                </div>
              ))
              :
              <div className="grid place-items-center h-125">Belum ada data</div>
          }
        </div>
      </main>
      <AddEditMovieModal
        show={showAdd || !!dataToEdit}
        onClose={() => {
          setShowAdd(false)
          setDataToEdit(undefined)
        }}
        defaultData={dataToEdit}
      />
    </section>
  )
}