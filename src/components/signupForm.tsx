"use client";

import { useState } from "react";
import { Field, Label, Switch } from "@headlessui/react";
import UserFetcher from "@/utils/api/UserFetcher";
import { User } from "@/utils/interfaces/User";
import Link from "next/link"; 

export default function SignupForm() {
  const [agreed, setAgreed] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false); 
  const [emailError, setEmailError] = useState("");
const [formData, setFormData] = useState<User>({
    id: "",
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    role: "user",
    password: "",
    imgUrl: "",
    addresses: [{ id: "", country: "", street: "", city: "", zip: "" }],
});


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      addresses: [{ ...prev.addresses[0], [name]: value }],
    }));
  };

  const validateEmail = (email: string) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};


const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  if (!validateEmail(formData.email)) {
    setEmailError("E-postadressen är inte giltig.");
    return;
  } else {
    setEmailError("");
  }

  if (!agreed) {
    alert("Du måste acceptera villkoren för att registrera dig.");
    return;
  }

  try {
    await UserFetcher.registerUser(formData);
    setIsRegistered(true);
  } catch (error) {
    alert("Registrering misslyckades. Försök igen.");
  }
};

  return (
    <div className="isolate bg-white px-6 py-24 sm:py-32 lg:px-8">
      <div aria-hidden="true" className="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]">
        <div
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
          className="relative left-1/2 -z-10 aspect-1155/678 w-[36.125rem] max-w-none -translate-x-1/2 rotate-[30deg] bg-linear-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-40rem)] sm:w-[72.1875rem]"
        />
      </div>

      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-4xl font-semibold tracking-tight text-balance text-gray-900 sm:text-5xl">Registrera dig</h2>
        <p className="mt-2 text-lg/8 text-gray-600">Fyll i formuläret nedan för att skapa ett konto.</p>
      </div>

      {isRegistered ? (
        <div className="text-center mt-10">
          <p className="text-lg text-green-600">🎉 Registrering lyckades!</p>
          <Link href="/login" className="text-blue-600 font-semibold hover:underline">
            Gå till inloggning
          </Link>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="mx-auto mt-16 max-w-xl sm:mt-20">
          <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
            <div>
              <label htmlFor="firstname" className="block text-sm/6 font-semibold text-gray-900">Förnamn</label>
              <input id="firstname" name="firstname" type="text" autoComplete="given-name" onChange={handleChange} className="block w-full rounded-md px-3.5 py-2 border border-gray-300" required />
            </div>
            <div>
              <label htmlFor="lastname" className="block text-sm/6 font-semibold text-gray-900">Efternamn</label>
              <input id="lastname" name="lastname" type="text" autoComplete="family-name" onChange={handleChange} className="block w-full rounded-md px-3.5 py-2 border border-gray-300" required />
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="email" className="block text-sm/6 font-semibold text-gray-900">E-post</label>
              <input id="email" name="email" type="email" autoComplete="email" onChange={handleChange} className="block w-full rounded-md px-3.5 py-2 border border-gray-300" required/> 
              {emailError && <p className="text-red-500 text-sm mt-1">{emailError}</p>}
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="password" className="block text-sm/6 font-semibold text-gray-900">Lösenord</label>
              <input id="password" name="password" type="password" onChange={handleChange} className="block w-full rounded-md px-3.5 py-2 border border-gray-300" required />
            </div>

            <h3 className="text-lg font-semibold sm:col-span-2">Adress</h3>

            <div className="sm:col-span-2">
              <label htmlFor="street" className="block text-sm/6 font-semibold text-gray-900">Gata</label>
              <input id="street" name="street" type="text" onChange={handleAddressChange} className="block w-full rounded-md px-3.5 py-2 border border-gray-300" required />
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="zip" className="block text-sm/6 font-semibold text-gray-900">Postnummer</label>
              <input id="zip" name="zip" type="text" onChange={handleAddressChange} className="block w-full rounded-md px-3.5 py-2 border border-gray-300" required />
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="city" className="block text-sm/6 font-semibold text-gray-900">Ort</label>
              <input id="city" name="city" type="text" onChange={handleAddressChange} className="block w-full rounded-md px-3.5 py-2 border border-gray-300" required />
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="country" className="block text-sm/6 font-semibold text-gray-900">Land</label>
              <input id="country" name="country" type="text" onChange={handleAddressChange} className="block w-full rounded-md px-3.5 py-2 border border-gray-300" required />
            </div>


            <Field className="flex gap-x-4 sm:col-span-2">
              <Switch checked={agreed} onChange={setAgreed} className="group flex w-8 rounded-full bg-gray-200 p-px">
                <span className="sr-only">Agree to policies</span>
                <span className="size-4 transform rounded-full bg-white group-data-checked:translate-x-3.5" />
              </Switch>
              <Label className="text-sm/6 text-gray-600">Jag godkänner användarvillkoren.</Label>
            </Field>
          </div>

          <button type="submit" className="w-full bg-indigo-600 text-white p-2 rounded">Registrera</button>
        </form>
      )}
    </div>
  );
}
