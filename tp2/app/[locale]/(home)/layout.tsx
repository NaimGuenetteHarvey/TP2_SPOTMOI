"use client";

import { usePathname, useRouter } from "@/i18n/navigation";
import { useLocale } from "next-intl";
import { useState } from "react";
import { useTranslations } from "next-intl";
export default function OtherLayout({ children }: Readonly<{ children: React.ReactNode }>) {

  // ... Bidules variés pour i18n (locale, router, pathname, etc.)
  const pathname = usePathname();
  const locale = useLocale();
  const router = useRouter();
  const t = useTranslations('layout');
  const [selectLocale, setSelectLocale] = useState(locale);
  function chooseLocale(e : any){
    setSelectLocale(e.target.value); // On met l'état à jour
    router.replace(pathname, { locale : e.target.value }); // On change la locale dans la route
  }
  return (

    <div>

       <header className="w-full">
		      <div className="flex items-center">
			      <div className="p-2 navHover">
				       <h1 className="text-3xl">{t("title")}</h1>
			      </div>
			     <div className="flex-1"></div>
			     <div className="p-2 navHover">
				    <h2 className="text-3xl"><a>{t("yourArtists")}</a></h2>
			   </div>
			    <div className="p-2">
				    <select onChange={chooseLocale} value={selectLocale}className="bg-black py-1 px-2 rounded-md text-whites">
					   <option value="fr">Français</option>
					   <option value="en">English</option>
				   </select>
			   </div>
		     </div>
	     </header>

      <main>
        {children}
      </main>

       <footer className="w-full">
		     <div className="py-1">
			    <div>
				   <p className="text-center">&copy; {t("footer")}</p>
			    </div>
		     </div>
	      </footer>

    </div>

  );

}