import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { api } from "@/utils/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslation } from "next-i18next";
import { useForm } from "react-hook-form";
import { z } from "zod";

const folderSchema = z.object({
  name: z
    .string({ required_error: "NAME_REQUIRED" })
    .min(3, "NAME_LENGTH")
    .max(50, "NAME_LENGTH"),
});

const errorTranslation = { namespace: "folder", baseKey: "form.error" };

type FolderFormInputs = z.infer<typeof folderSchema>;

type Props = {
  onSuccess: () => void;
};
export const FolderForm = (props: Props) => {
  const { t } = useTranslation("folder");
  const form = useForm({
    resolver: zodResolver(folderSchema),
  });
  const utils = api.useContext();

  const { mutate } = api.folder.create.useMutation({
    async onSuccess() {
      await utils.folder.all.invalidate();
      props.onSuccess();
    },
  });
  const onSubmit = (data: FolderFormInputs) => {
    mutate(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className={"space-y-8"}>
        <FormField
          control={form.control}
          name={"name"}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("form.name")}</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage translation={errorTranslation} />
            </FormItem>
          )}
        />
        <Button type={"submit"} disabled={form.formState.isSubmitting}>
          {t("form.cta")}
        </Button>
      </form>
    </Form>
  );
};
