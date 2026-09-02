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
      <Tabs.ListContainer className="border-b border-border-light">
        <Tabs.List aria-label="Requests" className="gap-6 flex cursor-pointer px-1">
          <Tabs.Tab
            id="sent"
            className="flex h-12 max-w-fit items-center gap-2 px-1 text-sm font-semibold text-text-muted data-[selected=true]:font-bold data-[selected=true]:text-primary"
          >
            <Send className="h-4 w-4" />
            <span>পাঠানো রিকোয়েস্ট</span>
            <Tabs.Indicator className="bg-primary" />
          </Tabs.Tab>
          <Tabs.Tab
            id="received"
            className="flex h-12 max-w-fit items-center gap-2 px-1 text-sm font-semibold text-text-muted data-[selected=true]:font-bold data-[selected=true]:text-primary"
          >
            <Inbox className="h-4 w-4" />
            <span>প্রাপ্ত রিকোয়েস্ট</span>
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