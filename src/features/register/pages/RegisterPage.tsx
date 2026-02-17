import images from "@assets/images";
import AuthCard from "@shared/ui/AuthCard";
import { Input } from "@shared/ui/Input";
import { useState, type SyntheticEvent } from "react";
import { useNavigate } from "react-router-dom";
import type { RegisterFormProps } from "../register.types";

export default function RegisterPage() {
  const [form, setForm] = useState<RegisterFormProps>({
    username: "",
    password: "",
    password2: ""
  })

  const navigate = useNavigate()


  const handleChangeForm = (name: string, value: string) => {
    setForm(prev => {
      return {
        ...prev,
        [name]: value
      }
    })
  }

  const handleSubmit = (e: SyntheticEvent<HTMLFormElement>) => {
    e?.preventDefault()
    console.log('submit')
    localStorage.setItem('isLoggedIn', 'true')
    navigate("/home")
  }

  const handleClickGoogle = (e: SyntheticEvent<HTMLButtonElement>) => {
    e?.preventDefault()
    console.log('Masuk dengan google')
  }

  return (
    <section
      style={{ backgroundImage: `url(${images.REGISTER_BG})` }}
      className={`min-h-screen w-screen py-20 bg-center bg-cover flex flex-col items-center justify-center overflow-auto`}>
      <AuthCard
        title="Daftar"
        caption="Selamat datang!"
        onSubmit={handleSubmit}
        onClickGoogle={handleClickGoogle}
      >
        <Input
          label="Username"
          placeholder="Masukkan username"
          name="username"
          value={form?.username}
          onChange={(e) => handleChangeForm("username", e?.target?.value)}
          className="mb-5 md:mb-7 lg:mb-9"
          required
        />
        <Input
          type="password"
          label="Kata Sandi"
          placeholder="Masukkan kata sandi"
          name="password"
          value={form?.password}
          onChange={(e) => handleChangeForm("password", e?.target?.value)}
          className="mb-5 md:mb-7 lg:mb-9"
          required
        />
        <Input
          type="password"
          label="Konfirmasi Kata Sandi"
          placeholder="Masukkan kata sandi"
          name="password2"
          value={form?.password2}
          onChange={(e) => handleChangeForm("password2", e?.target?.value)}
          className="mb-2 lg:mb-3"
          required
        />
        <div className="flex gap-1 mb-5 text-left md:mb-7 lg:mb-9"        >
          <p className="grow flex gap-1 text-[10px] text-light-primary md:text-[12px] lg:text-[16px]">
            <span className="text-light-secondary">Sudah punya akun?</span>
            <a href="/login" className="font-medium">Masuk</a>
          </p>
          <button className="text-[10px] md:text-[12px] lg:text-[16px]">Lupa kata sandi?</button>
        </div>
      </AuthCard>
    </section>
  )
}