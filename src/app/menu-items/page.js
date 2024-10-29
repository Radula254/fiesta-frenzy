"use client";
import UserTabs from "@/components/layout/UserTabs";
import { useProfile } from "@/components/UseProfile";
import Link from "next/link";
import Right from "@/components/icons/Right";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function MenuItemsPage() {
  const [menuItems, setMenuItems] = useState([]);
  const { loading: profileLoading, data: profileData } = useProfile();

  useEffect(() => {
    fetch('/api/menu-items').then(res => {
      res.json().then(menuItems => {
        setMenuItems(menuItems);
      });
    });
  }, []);

  if (profileLoading) {
    return "Loading menu items...";
  }

  if (!profileData.admin) {
    return "Unauthorised!!!";
  }

  return (
    <section className="mt-8 max-w-2xl mx-auto">
      <UserTabs isAdmin={true} />
      <div className="mt-8">
        <Link className="button flex" href={"/menu-items/new"}>
          <span>Create new menu item</span>
          <Right />
        </Link>
      </div>
      <div>
        <h2 className="text-sm text-gray-500 mt-8">Edit menu item:</h2>
        <div className="grid grid-cols-3 gap-2">
          {menuItems?.length > 0 && menuItems.map(item => (
            <Link
              key={item._id}
              href={'/menu-items/edit/' + item._id}
              className="bg-gray-200 p-6 rounded-lg text-center group hover:bg-white hover:shadow-2xl hover:shadow-black/25 transition-all"
            >
              <div className="relative">
                <Image
                  className="max-h-auto max-h-24 block mx-auto rounded-md"
                  src={item.image}
                  alt={`${item.name} image`}
                  width={100}
                  height={100}
                />
              </div>
              <div className="text-center">
                {item.name}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
