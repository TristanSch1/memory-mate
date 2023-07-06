import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "~/components/Button";
import { api } from "~/utils/api";

const deckSchema = z.object({
  name: z.string().min(1),
  description: z.string().optional(),
})

type DeckFormInputs = z.infer<typeof deckSchema>;

const DeckForm = () => {
  const { handleSubmit, register } = useForm({
    resolver: zodResolver(deckSchema),
  })
  const utils = api.useContext();

  const { mutate, error } = api.deck.create.useMutation({
    async onSuccess() {
      await utils.deck.all.invalidate();
    },
  });

  const onSubmit = (data: DeckFormInputs) => {
    console.log(data)
    mutate(data);
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)} >
      <input {...register("name")} />
      <input {...register("description")} />
      <Button type="submit">Ajouter</Button>
    </form>
  );
};

export default DeckForm;
