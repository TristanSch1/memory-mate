import { appConfig } from "@/_config";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { useDeckContext } from "@/features/decks/stores/DeckProvider";
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
  front: z.string().min(1),
  back: z.string().min(1),
});

type CardFormInputs = z.infer<typeof cardSchema>;

type Props = {
  card?: RouterInputs["card"]["update"];
  onSuccess: () => void;
};

const CardForm = (props: Props) => {
  const { t } = useTranslation("card");
  const { id: deckId } = useDeckContext();
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
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={"back"}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("from.back")}</FormLabel>
              <FormControl>
                <Editor
                  apiKey={appConfig.tinyMceApiKey}
                  value={field.value}
                  onEditorChange={field.onChange}
                  init={tinyMceInit}
                />
              </FormControl>
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
