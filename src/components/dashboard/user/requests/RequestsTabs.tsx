"use client";

import { Tabs } from "@heroui/react";

import { Inbox, Send } from "lucide-react";

import type { ReactNode } from "react";

interface RequestsTabsProps {
  sentContent: ReactNode;
  receivedContent: ReactNode;
}

export function RequestsTabs({
  sentContent,
  receivedContent,
}: RequestsTabsProps) {
  return (
    <Tabs className="w-full">
      <Tabs.ListContainer
        className="
          border-b border-border-light
          max-lg:sticky max-lg:top-16 max-lg:z-30
          max-lg:border max-lg:border-border-light
          max-lg:rounded-xl
          max-lg:bg-surface
          [&_[aria-label='Scroll_tabs_left']]:hidden
          [&_[aria-label='Scroll_tabs_right']]:hidden
        "
      >
        <Tabs.List
          aria-label="Requests"
          className="
            flex gap-6 cursor-pointer px-1
            max-lg:grid max-lg:grid-cols-2 max-lg:gap-0
          "
        >
          <Tabs.Tab
            id="sent"
            className="
              flex h-12 max-w-fit items-center gap-2 px-1
              text-sm font-semibold text-text-muted
              data-[selected=true]:font-bold
              data-[selected=true]:text-primary
              max-lg:w-full max-lg:max-w-none
              max-lg:justify-center max-lg:px-2
              max-lg:data-[selected=true]:bg-primary-light
            "
          >
            <Send className="h-4 w-4" />
            <span className="whitespace-nowrap">পাঠানো রিকোয়েস্ট</span>
            <Tabs.Indicator className="bg-primary" />
          </Tabs.Tab>

          <Tabs.Tab
            id="received"
            className="
              flex h-12 max-w-fit items-center gap-2 px-1
              text-sm font-semibold text-text-muted
              data-[selected=true]:font-bold
              data-[selected=true]:text-primary
              max-lg:w-full max-lg:max-w-none
              max-lg:justify-center max-lg:px-2
              max-lg:border-l max-lg:border-border-light
              max-lg:data-[selected=true]:bg-primary-light
            "
          >
            <Inbox className="h-4 w-4" />
            <span className="whitespace-nowrap">প্রাপ্ত রিকোয়েস্ট</span>
            <Tabs.Indicator className="bg-primary" />
          </Tabs.Tab>
        </Tabs.List>
      </Tabs.ListContainer>

      <Tabs.Panel className="pt-6" id="sent">
        {sentContent}
      </Tabs.Panel>

      <Tabs.Panel className="pt-6" id="received">
        {receivedContent}
      </Tabs.Panel>
    </Tabs>
  );
}
