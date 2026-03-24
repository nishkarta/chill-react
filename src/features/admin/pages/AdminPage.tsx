import AddEditMovieModal from "@features/admin/widgets/AddEditMovieModal";
import Header from "@shared/layout/Header";
import Button from "@shared/ui/Button";
import { type CarouselItem } from "@shared/ui/ui.types";
import { useEffect, useState } from "react";

export default function AdminPage() {
  const [showAdd, setShowAdd] = useState(false)
const defaultList = JSON.parse(localStorage.getItem("newReleaseList") ?? "[]")
  const [list, setList] = useState<CarouselItem[]>(defaultList)

  const handleDelete = (id: string) => {
    setList(prev => prev.filter(obj => obj.id !== id))
  }

  useEffect(() => {
    localStorage.setItem("newReleaseList", JSON.stringify(list))
  }, [list])

  return (
    <section className="bg-header h-screen flex flex-col">
      <Header />
      <main className="grow flex flex-col gap-8 text-white py-5 *:w-full *:px-5.5 md:*:px-10 lg:*:px-20">
        <div className="flex items-center gap-4">
          <h3 className="grow text-left text-[20px] md:text-[24px] lg:text-[32px]">List Movie/Series Terbaru</h3>
          <Button onClick={() => setShowAdd(true)} variant="outlined" className="h-6! w-6! p-0! rounded-[50%] text-[16px]! border-2! md:text-[20px]! md:w-8! md:h-8! lg:text-[24px]! lg:h-10! lg:w-10!">
            +
          </Button>
        </div>
        <div>
          list
        </div>
      </main>
      <AddEditMovieModal
      show={showAdd}
      onClose={()=> setShowAdd(false)}
      />
    </section>
  )
}