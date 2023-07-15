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
import { api } from "@/utils/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { Editor } from "@tinymce/tinymce-react";
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
  onSuccess: () => void;
};

const CardForm = (props: Props) => {
  const { id: deckId } = useDeckContext();
  const form = useForm({
    resolver: zodResolver(cardSchema),
  });

  const utils = api.useContext();
  const { mutate, error } = api.card.create.useMutation({
    async onSuccess() {
      await utils.card.all.invalidate();
      props.onSuccess();
    },
  });

  const onSubmit = (data: CardFormInputs) => {
    console.log(data);
    mutate({ ...data, deckId });
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className={"space-y-8"}>
        <FormField
          control={form.control}
          name={"front"}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Face</FormLabel>
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
              <FormLabel>Dos</FormLabel>
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
          Ajouter
        </Button>
      </form>
    </Form>
  );
};

export default CardForm;
