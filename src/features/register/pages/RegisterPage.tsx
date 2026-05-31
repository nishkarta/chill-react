import images from "@assets/images";
import AuthCard from "@shared/ui/AuthCard";
import { Input } from "@shared/ui/Input";
import { useState, type SyntheticEvent } from "react";
import { useNavigate } from "react-router-dom";
import type { RegisterFormProps } from "../register.types";
import { omitKeys } from "@shared/helpers/omitKeys";
import { register } from "@shared/services/auth.service";
import { toast } from "@shared/store/ToastProvider";

export default function RegisterPage() {
  const [form, setForm] = useState<RegisterFormProps>({
    fullname: "",
    username: "",
    email: "",
    password: "",
    password2: ""
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const navigate = useNavigate()


  const handleChangeForm = (name: string, value: string) => {
    setForm(prev => {
      return {
        ...prev,
        [name]: value
      }
    })
  }

  const handleSubmit = async (e: SyntheticEvent<HTMLFormElement>) => {
    e?.preventDefault()
    try {
      if (form?.password !== form?.password2) {
        toast.error("Pasword tidak sama. Harap perbaiki terlebih dahulu.")
        return;
      }
      setIsSubmitting(true)
      const res = await register(omitKeys(form, ["password2"]))
      localStorage.setItem("accessToken", res.data.token)
      localStorage.setItem("userDetail", JSON.stringify(res.data.userDetail))
      localStorage.setItem("isLoggedIn", "true")
      toast.success("Pendaftaran akun berhasil. Silahkan verifikasi akun melalui email untuk dapat masuk ke website")
      navigate("/login")
      console.log(res, 'ini response login')
    } catch (err) {
      const axiosError = err as import("axios").AxiosError<{ error: string }>;
      const errorMessage = axiosError.response?.data?.error || "Terjadi kesalahan saat register";
      toast.error(errorMessage);
    } finally {

      setIsSubmitting(false)
    }
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
        isSubmitting={isSubmitting}
      >
        <Input
          label="Nama Lengkap"
          placeholder="Masukkan nama lengkap"
          name="fullname"
          value={form?.fullname}
          onChange={(e) => handleChangeForm("fullname", e?.target?.value)}
          className="mb-5 md:mb-7 lg:mb-9"
          required
        />
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
          label="Email"
          placeholder="Masukkan email"
          name="email"
          value={form?.email}
          onChange={(e) => handleChangeForm("email", e?.target?.value)}
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