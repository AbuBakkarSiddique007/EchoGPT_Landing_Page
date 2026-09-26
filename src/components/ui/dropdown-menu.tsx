import { Menu } from "@base-ui/react/menu";
import { cn } from "cn";

function DropdownMenu({ ...props }: Menu.Root.Props) {
    return <Menu.Root data-slot="dropdown-menu" {...props} />;
}

function DropdownMenuTrigger({ className, ...props }: Menu.Trigger.Props) {
    return (
        <Menu.Trigger
            data-slot="dropdown-menu-trigger"
            className={cn(className)}
            {...props}
        />
    );
}

function DropdownMenuPortal({ ...props }: Menu.Portal.Props) {
    return <Menu.Portal data-slot="dropdown-menu-portal" {...props} />;
}

function DropdownMenuPositioner({ className, ...props }: Menu.Positioner.Props) {
    return (
        <Menu.Positioner
            data-slot="dropdown-menu-positioner"
            className={cn(className)}
            {...props}
        />
    );
}

function DropdownMenuPopup({ className, ...props }: Menu.Popup.Props) {
    return (
        <Menu.Popup
            data-slot="dropdown-menu-popup"
            className={cn(
                "z-50 min-w-48 origin-(--transform-origin) rounded-xl border border-border/80 bg-popover p-1 text-popover-foreground shadow-xl outline-none transition-[opacity,transform] duration-150 data-closed:pointer-events-none data-closed:scale-95 data-closed:opacity-0 data-open:scale-100 data-open:opacity-100",
                className
            )}
            {...props}
        />
    );
}

function DropdownMenuLinkItem({ className, ...props }: Menu.LinkItem.Props) {
    return (
        <Menu.LinkItem
            data-slot="dropdown-menu-link-item"
            className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-foreground/75 outline-none transition-colors data-highlighted:bg-muted data-highlighted:text-foreground",
                className
            )}
            {...props}
        />
    );
}

export {
    DropdownMenu,
    DropdownMenuLinkItem,
    DropdownMenuPopup,
    DropdownMenuPortal,
    DropdownMenuPositioner,
    DropdownMenuTrigger,
};
