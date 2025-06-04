import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

export function PeriodPicker() {
  return (
    <ToggleGroup type="single" size="lg" variant="outline">
      <ToggleGroupItem value="24h" aria-label="Select previous 24 hours">
        24H
      </ToggleGroupItem>
      <ToggleGroupItem value="7d" aria-label="Select previous week">
        7D
      </ToggleGroupItem>
      <ToggleGroupItem value="30d" aria-label="Select previous month">
        30D
      </ToggleGroupItem>
      <ToggleGroupItem value="ytd" aria-label="Select year to date">
        YTD
      </ToggleGroupItem>
      <ToggleGroupItem value="1y" aria-label="Select previous year">
        1Y
      </ToggleGroupItem>
      <ToggleGroupItem value="all" aria-label="Select all">
        All
      </ToggleGroupItem>
    </ToggleGroup>
  );
}
