import images from "@assets/images";
import AuthCard from "@shared/ui/AuthCard";
import { Input } from "@shared/ui/Input";
import { useState, type SyntheticEvent } from "react";
import type { LoginFormProps } from "../login.types";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [form, setForm] = useState<LoginFormProps>({
    username: "",
    password: ""
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
      style={{ backgroundImage: `url(${images.LOGIN_BG})` }}
      className={`h-screen w-screen bg-center bg-cover flex flex-col items-center justify-center overflow-auto`}>
      <AuthCard
        title="Masuk"
        caption="Selamat datang kembali!"
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
          className="mb-2 lg:mb-3"
          required
        />
        <div className="flex gap-1 mb-5 text-left md:mb-7 lg:mb-9"        >
          <p className="grow flex gap-1 text-[10px] text-light-primary md:text-[12px] lg:text-[16px]">
            <span className="text-light-secondary">Belum punya akun?</span>
            <a href="/register" className="font-medium">Daftar</a>
          </p>
          <button className="text-[10px] md:text-[12px] lg:text-[16px]">Lupa kata sandi?</button>
        </div>
      </AuthCard>
    </section>
  )
}