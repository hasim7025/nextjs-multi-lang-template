'use client';

import { useLocale } from 'next-intl';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import React, { useTransition } from 'react';

export default function LanguageSwitcher() {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const localeActive = useLocale();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const onSelectChange = (e) => {
    const nextLocale = e.target.value;

    const newPathname = `/${nextLocale}${pathname.replace(`/${localeActive}`, '')}`;

    startTransition(() => {
      router.replace(`${newPathname}?${searchParams.toString()}`);
    });
  };

  return (
    <label className="rounded">
      <p className="sr-only">Change Language</p>
      <select
        defaultValue={localeActive}
        className="bg-transparent py-2"
        onChange={onSelectChange}
        disabled={isPending}
      >
        <option value="en">EN</option>
        <option value="de">DE</option>
      </select>
    </label>
  );
}
