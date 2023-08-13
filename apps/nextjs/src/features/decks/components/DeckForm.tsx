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
import { Textarea } from "@/components/ui/textarea";
import { api } from "@/utils/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslation } from "next-i18next";
import { useForm } from "react-hook-form";
import { z } from "zod";

const deckSchema = z.object({
  name: z
    .string({ required_error: "NAME_REQUIRED" })
    .min(3, "NAME_LENGTH")
    .max(50, "NAME_LENGTH"),
  description: z
    .string()
    .min(3, "DESCRIPTION_LENGTH")
    .max(500, "DESCRIPTION_LENGTH")
    .optional(),
});

const errorTranslation = { namespace: "deck", baseKey: "form.error" };

export type DeckFormInputs = z.infer<typeof deckSchema>;

type Props = {
  data?: DeckFormInputs & { id: string };
  onSuccess?: () => void;
};

export const DeckForm = (props: Props) => {
  const { t } = useTranslation("deck");
  const form = useForm({
    resolver: zodResolver(deckSchema),
    defaultValues: props.data,
  });
  const utils = api.useContext();

  const { mutate: createMutate } = api.deck.create.useMutation({
    async onSuccess() {
      await utils.deck.all.invalidate();
      props.onSuccess?.();
    },
  });

  const { mutate: editMutate } = api.deck.update.useMutation({
    async onSuccess() {
      await utils.deck.all.invalidate();
      props.onSuccess?.();
    },
  });

  const onSubmit = (data: DeckFormInputs) => {
    if (props.data) {
      editMutate({ ...data, id: props.data.id });
    } else {
      createMutate(data);
    }
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
        <FormField
          control={form.control}
          name={"description"}
          render={({ field }) => (
            <FormItem>
              <FormLabel> {t("form.description")}</FormLabel>
              <FormControl>
                <Textarea {...field} />
              </FormControl>
              <FormMessage translation={errorTranslation} />
            </FormItem>
          )}
        />
        <Button type="submit" className={"w-full"}>
          {t("form.cta")}
        </Button>
      </form>
    </Form>
  );
};
