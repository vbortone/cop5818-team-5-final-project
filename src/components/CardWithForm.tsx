import * as React from "react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function CardWithForm() {
  const [selectedFramework, setSelectedFramework] = useState<
    string | undefined
  >(undefined);

  // Handling value change for Select
  const handleSelectChange = (value: string) => {
    setSelectedFramework(value);
  };

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Create project</CardTitle>
        <CardDescription>Deploy your new project in one-click.</CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Name</Label>
              <Input id="name" placeholder="Name of your project" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="framework">Framework</Label>
              <Select>
                <SelectTrigger id="framework">
                  {selectedFramework ? (
                    <SelectValue>{selectedFramework}</SelectValue>
                  ) : (
                    <span className="text-gray-500">Select</span>
                  )}
                </SelectTrigger>
                <SelectContent>
                  <SelectItem
                    value="next"
                    onClick={() => handleSelectChange("Next.js")}
                  >
                    Next.js
                  </SelectItem>
                  <SelectItem
                    value="sveltekit"
                    onClick={() => handleSelectChange("SvelteKit")}
                  >
                    SvelteKit
                  </SelectItem>
                  <SelectItem
                    value="astro"
                    onClick={() => handleSelectChange("Astro")}
                  >
                    Astro
                  </SelectItem>
                  <SelectItem
                    value="nuxt"
                    onClick={() => handleSelectChange("Nuxt.js")}
                  >
                    Nuxt.js
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Cancel</Button>
        <Button>Deploy</Button>
      </CardFooter>
    </Card>
  );
}
