"use client";
import { iconMap } from "@/utils/iconMap";
import {
  FieldError,
  Form,
  Input,
  Label,
  Surface,
  TextField,
  toast,
  ComboBox,
  ListBox,
} from "@heroui/react";
import React, { useState } from "react";
import { addClub, editClub, IClub, IDisciplineOptions } from "@/modules/clubs";

interface Props {
  club?: IClub;
  disciplinesOptions: IDisciplineOptions[];
  formId: string;
  onSubmited?: () => void;
  isLoading?: boolean;
  setIsLoading?: (value: boolean) => void;
}
export const FormClub = ({
  club,
  disciplinesOptions,
  formId,
  onSubmited,
  isLoading,
  setIsLoading,
}: Props) => {
  const [name, setName] = useState(club?.name || "");
  const [disciplineId, setDisciplineId] = useState(club?.discipline.id || "");

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({});
    const newErrors: Record<string, string> = {};
    if (!name) {
      newErrors.name = "Debe ingresar un nombre";
    }
    if (!disciplineId) {
      newErrors.disciplineId = "Debe ingresar una disciplina";
    }
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) {
      return;
    }
    setIsLoading?.(true);
    let res;
    const data = {
      name,
      disciplineId,
    };
    if (club) {
      res = await editClub({ id: club.id, data });
    } else {
      res = await addClub(data);
    }
    setIsLoading?.(false);
    if (res.error) {
      let errorDescription = res.message;

      if (res.errors) {
        // Convertimos el objeto { type: ["msg"] } en una lista de strings limpia
        errorDescription = Object.entries(res.errors)
          .map(([field, messages]) => {
            const msgList = Array.isArray(messages)
              ? messages.join(", ")
              : messages;
            return `${field}: ${msgList}`;
          })
          .join("\n"); // Los separamos por saltos de línea para el toast
      }

      // 2. Pasamos la descripción formateada al componente de notificaciones
      toast.danger(res.message, {
        description: errorDescription,
      });
      if (res.errors) {
        setErrors(res.errors);
      }
      return;
    }
    toast.success(res.message, {
      description: res.message,
    });
    onSubmited?.();
  };
  return (
    <Surface variant="transparent">
      <Form id={formId} onSubmit={handleSubmit} className="flex flex-col gap-4">
        <TextField
          isRequired
          className="w-full"
          name="name"
          type="text"
          isInvalid={!!errors.name || undefined}
        >
          <Label>Nombre</Label>
          <Input
            variant="secondary"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              setErrors({});
            }}
            placeholder="Ingrese el nombre del rol"
          />
          <FieldError children={errors.name && <> {errors.name}</>} />
        </TextField>

        <ComboBox
          variant="secondary"
          isRequired
          className="w-full"
          name="disciplineId"
          selectedKey={disciplineId}
          onSelectionChange={(key) => setDisciplineId(key?.toString() || "")}
        >
          <Label>Disciplina</Label>
          <ComboBox.InputGroup>
            <Input placeholder="Buscar disciplina..." />
            <ComboBox.Trigger />
          </ComboBox.InputGroup>
          <ComboBox.Popover>
            <ListBox>
              {disciplinesOptions.map((discipline) => (
                <ListBox.Item
                  key={discipline.id}
                  id={discipline.id}
                  textValue={discipline.name}
                >
                  {discipline.name}
                  <ListBox.ItemIndicator />
                </ListBox.Item>
              ))}
            </ListBox>
          </ComboBox.Popover>
          <FieldError />
        </ComboBox>
      </Form>
    </Surface>
  );
};
