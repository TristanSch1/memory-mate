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
import { useForm } from "react-hook-form";
import { z } from "zod";

const deckSchema = z.object({
  name: z.string().min(1),
  description: z.string().optional(),
});

type DeckFormInputs = z.infer<typeof deckSchema>;

type Props = {
  onSuccess: () => void;
};

const DeckForm = (props: Props) => {
  const form = useForm({
    resolver: zodResolver(deckSchema),
  });
  const utils = api.useContext();

  const { mutate, error } = api.deck.create.useMutation({
    async onSuccess() {
      await utils.deck.all.invalidate();
      props.onSuccess();
    },
  });

  const onSubmit = (data: DeckFormInputs) => {
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
              <FormLabel>Nom du deck</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={"description"}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className={"w-full"}>
          Ajouter
        </Button>
      </form>
    </Form>
  );
};

export default DeckForm;
