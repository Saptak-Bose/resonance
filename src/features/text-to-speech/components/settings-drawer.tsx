import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Settings } from "lucide-react";
import SettingsPanelSettings from "./settings-panel-settings";
import { ReactNode } from "react";

type Props = {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  children?: Readonly<ReactNode>;
};

export default function SettingsDrawer({
  onOpenChange,
  children,
  open,
}: Props) {
  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      {children ?? (
        <DrawerTrigger asChild>
          <Button variant={"outline"} size={"sm"}>
            <Settings className="size-4" />
          </Button>
        </DrawerTrigger>
      )}
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Settings</DrawerTitle>
        </DrawerHeader>
        <div className="overflow-y-auto">
          <SettingsPanelSettings />
        </div>
      </DrawerContent>
    </Drawer>
  );
}
