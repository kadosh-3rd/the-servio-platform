"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Icons } from "@/components/icons";
import { addMenuCategory, addMenuItem } from "@/lib/actions/profile";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { MultiSelect } from "@/components/ui/multi-select";
import { ImageUpload } from "@/components/ui/image-upload";

const menuCategorySchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  description: z.string().optional(),
  image: z.string().optional(),
});

const menuItemSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  description: z.string().optional(),
  price: z.number().min(0, "Price must be positive"),
  category: z.string(),
  image: z.string().optional(),
  preparationTime: z.number().optional(),
  ingredients: z.array(z.string()).optional(),
  allergens: z.array(z.string()).optional(),
  nutritionalInfo: z
    .object({
      calories: z.number().optional(),
      protein: z.number().optional(),
      carbs: z.number().optional(),
      fats: z.number().optional(),
    })
    .optional(),
});

type MenuCategoryValues = z.infer<typeof menuCategorySchema>;
type MenuItemValues = z.infer<typeof menuItemSchema>;

const commonAllergens = [
  "Milk",
  "Eggs",
  "Fish",
  "Shellfish",
  "Tree nuts",
  "Peanuts",
  "Wheat",
  "Soy",
];

export default function MenuSetup() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [categories, setCategories] = useState<{ id: string; name: string }[]>(
    []
  );
  const [activeTab, setActiveTab] = useState("category");

  const categoryForm = useForm<MenuCategoryValues>({
    resolver: zodResolver(menuCategorySchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  const itemForm = useForm<MenuItemValues>({
    resolver: zodResolver(menuItemSchema),
    defaultValues: {
      name: "",
      description: "",
      price: 0,
      category: "",
      preparationTime: 0,
      ingredients: [],
      allergens: [],
      nutritionalInfo: {
        calories: 0,
        protein: 0,
        carbs: 0,
        fats: 0,
      },
    },
  });

  async function onSubmitCategory(values: MenuCategoryValues) {
    startTransition(async () => {
      try {
        const result = await addMenuCategory(values);

        if (result.error) {
          toast.error(result.error);
          return;
        }

        toast.success("Category added successfully");
        setCategories([
          ...categories,
          { id: result.data._id, name: result.data.name },
        ]);
        categoryForm.reset();
      } catch (error) {
        toast.error("Something went wrong");
      }
    });
  }

  async function onSubmitItem(values: MenuItemValues) {
    startTransition(async () => {
      try {
        const result = await addMenuItem(values);

        if (result.error) {
          toast.error(result.error);
          return;
        }

        toast.success("Menu item added successfully");
        itemForm.reset();
      } catch (error) {
        toast.error("Something went wrong");
      }
    });
  }

  const handleContinue = () => {
    if (categories.length === 0) {
      toast.error("Add at least one menu category");
      return;
    }
    router.push("/setup/complete");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Menu Setup</CardTitle>
        <CardDescription>Add your menu categories and items</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="category">Categories</TabsTrigger>
            <TabsTrigger value="item" disabled={categories.length === 0}>
              Menu Items
            </TabsTrigger>
          </TabsList>

          <TabsContent value="category">
            <Form {...categoryForm}>
              <form
                onSubmit={categoryForm.handleSubmit(onSubmitCategory)}
                className="space-y-4"
              >
                <FormField
                  control={categoryForm.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category Name</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Appetizers" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={categoryForm.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Describe this category..."
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={categoryForm.control}
                  name="image"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category Image</FormLabel>
                      <FormControl>
                        <ImageUpload
                          onUpload={(url) => field.onChange(url)}
                          defaultImage={field.value}
                          aspectRatio="landscape"
                          folder="menu-categories"
                          className="w-full h-32"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" disabled={isPending}>
                  {isPending && (
                    <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  Add Category
                </Button>
              </form>
            </Form>
          </TabsContent>

          <TabsContent value="item">
            <Form {...itemForm}>
              <form
                onSubmit={itemForm.handleSubmit(onSubmitItem)}
                className="space-y-4"
              >
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={itemForm.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Item Name</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., Caesar Salad" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={itemForm.control}
                    name="price"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Price</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            min="0"
                            step="0.01"
                            {...field}
                            onChange={(e) =>
                              field.onChange(parseFloat(e.target.value))
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={itemForm.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Describe this item..."
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={itemForm.control}
                  name="image"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Item Image</FormLabel>
                      <FormControl>
                        <ImageUpload
                          onUpload={(url) => field.onChange(url)}
                          defaultImage={field.value}
                          aspectRatio="square"
                          folder="menu-items"
                          className="w-full h-48"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={itemForm.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <FormControl>
                        <select
                          className="w-full p-2 border rounded"
                          {...field}
                        >
                          <option value="">Select a category</option>
                          {categories.map((category) => (
                            <option key={category.id} value={category.id}>
                              {category.name}
                            </option>
                          ))}
                        </select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={itemForm.control}
                  name="allergens"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Allergens</FormLabel>
                      <FormControl>
                        {/* <MultiSelect
                          selected={field.value || []}
                          options={commonAllergens.map((allergen) => ({
                            label: allergen,
                            value: allergen,
                          }))}
                          onChange={field.onChange}
                          placeholder="Select allergens"
                          className="w-full"
                        /> */}
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={itemForm.control}
                    name="nutritionalInfo.calories"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Calories</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            min="0"
                            {...field}
                            onChange={(e) =>
                              field.onChange(parseFloat(e.target.value))
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={itemForm.control}
                    name="preparationTime"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Preparation Time (minutes)</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            min="0"
                            {...field}
                            onChange={(e) =>
                              field.onChange(parseFloat(e.target.value))
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <Button type="submit" disabled={isPending}>
                  {isPending && (
                    <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  Add Menu Item
                </Button>
              </form>
            </Form>
          </TabsContent>
        </Tabs>

        <div className="flex justify-between mt-6">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push("/setup/hours")}
          >
            Back
          </Button>
          <Button onClick={handleContinue} disabled={categories.length === 0}>
            Continue
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
