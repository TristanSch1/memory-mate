import { appConfig } from "@/_config";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useDeck } from "@/features/decks/components/DeckProvider";
import { api, type RouterInputs } from "@/utils/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { Editor } from "@tinymce/tinymce-react";
import { useTranslation } from "next-i18next";
import { useForm } from "react-hook-form";
import { z } from "zod";

const tinyMceInit = {
  height: 300,
  menubar: false,
  toolbar:
    "undo redo | formatselect | " +
    "bold italic backcolor | alignleft aligncenter " +
    "alignright alignjustify | bullist numlist outdent indent | " +
    "removeformat | help",
};

const cardSchema = z.object({
  front: z
    .string({ required_error: "FRONT_REQUIRED" })
    .min(1, "FRONT_LENGTH")
    .max(500, "FRONT_LENGTH"),
  back: z
    .string({ required_error: "BACK_REQUIRED" })
    .min(1, "BACK_LENGTH")
    .max(500, "BACK_LENGTH"),
});

const errorTranslation = { namespace: "card", baseKey: "form.error" };

type CardFormInputs = z.infer<typeof cardSchema>;

type Props = {
  card?: RouterInputs["card"]["update"];
  onSuccess: () => void;
};

const CardForm = (props: Props) => {
  const { t } = useTranslation("card");
  const { id: deckId } = useDeck();
  const form = useForm({
    defaultValues: props.card ?? { front: "", back: "" },
    resolver: zodResolver(cardSchema),
  });

  const utils = api.useContext();
  const { mutate: createMutate, error } = api.card.create.useMutation({
    async onSuccess() {
      await utils.card.all.invalidate();
      props.onSuccess();
    },
  });

  const { mutate: updateMutate } = api.card.update.useMutation({
    async onSuccess() {
      await utils.card.all.invalidate();
      props.onSuccess();
    },
  });

  const onSubmit = (data) => {
    if (props.card) {
      updateMutate({ ...data, id: props.card.id });
    } else {
      createMutate({ ...data, deckId });
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className={"space-y-8"}>
        <FormField
          control={form.control}
          name={"front"}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("form.front")}</FormLabel>
              <FormControl>
                <Editor
                  apiKey={appConfig.tinyMceApiKey}
                  value={field.value}
                  onEditorChange={field.onChange}
                  init={tinyMceInit}
                />
              </FormControl>
              <FormMessage translation={errorTranslation} />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={"back"}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("form.back")}</FormLabel>
              <FormControl>
                <Editor
                  apiKey={appConfig.tinyMceApiKey}
                  value={field.value}
                  onEditorChange={field.onChange}
                  init={tinyMceInit}
                />
              </FormControl>
              <FormMessage translation={errorTranslation} />
            </FormItem>
          )}
        />
        <Button type={"submit"} className={"w-full"}>
          {props.card ? t("form.update") : t("form.create")}
        </Button>
      </form>
    </Form>
  );
};

export default CardForm;
