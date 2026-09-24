import { Tag, ShoppingBag, Gift } from "lucide-react";

const actions = [
    { text: "পুরোনো বই বিক্রি করুন", Icon: Tag },
    { text: "প্রয়োজনীয় বই কিনুন", Icon: ShoppingBag },
    { text: "অব্যবহৃত বই দান করুন", Icon: Gift },
];

export default function HeroActions() {
    return (
        <ul className="flex flex-col">
            {actions.map(({ text, Icon }, index) => (
                <li
                    key={text}
                    className={`flex items-center gap-3.5 px-3.5 py-3.5 sm:py-4 ${index !== actions.length - 1 ? "border-b border-[#35858E]/10" : ""
                        }`}
                >
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#35858E]/10 text-[#35858E]">
                        <Icon className="h-5 w-5" />
                    </span>
                    <span className="text-base font-extrabold text-gray-900 sm:text-lg">
                        {text}
                    </span>
                </li>
            ))}
        </ul>
    );
}