"use client";

export default function TipsCard() {
  return (
    <div className="bg-accent-light border border-[rgba(246,206,113,0.5)] rounded-card p-4">
      <h3 className="m-0 mb-2 text-[13.5px] text-accent-text">ভালো পোস্টের জন্য টিপস</h3>
      <ul className="m-0 pl-5">
        <li className="text-[12.5px] text-accent-text mb-1.5 leading-5">
          স্পষ্ট ও প্রাকৃতিক আলোয় তোলা ছবি বেশি সাড়া পায়।
        </li>
        <li className="text-[12.5px] text-accent-text mb-1.5 leading-5">
          বইয়ের প্রকৃত অবস্থা উল্লেখ করলে ক্রেতার আস্থা বাড়ে।
        </li>
        <li className="text-[12.5px] text-accent-text leading-5">
          একাধিক বই একসাথে পোস্ট করলে দ্রুত বিক্রি হয়।
        </li>
      </ul>
    </div>
  );
}
