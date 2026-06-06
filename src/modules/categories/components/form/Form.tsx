"use client";
import { iconMap } from "@/utils/iconMap";
import {
  Description,
  ErrorMessage,
  FieldError,
  Form,
  Input,
  Label,
  Surface,
  Tag,
  TagGroup,
  TextArea,
  TextField,
  toast,
  ToggleButton,
  Select,
  ListBox,
} from "@heroui/react";
import React, { useState } from "react";
import {
  addCategory,
  editCategory,
  Gender,
  ICategory,
} from "@/modules/categories";
import { HugeiconsIcon } from "@hugeicons/react";

interface Props {
  category?: ICategory;
  formId: string;
  onSubmited?: () => void;
  isLoading?: boolean;
  setIsLoading?: (value: boolean) => void;
}
export const FormCategory = ({
  category,
  formId,
  onSubmited,
  isLoading,
  setIsLoading,
}: Props) => {
  const [name, setName] = useState(category?.name || "");
  const [minAge, setMinAge] = useState(category?.minAge || "");
  const [maxAge, setMaxAge] = useState(category?.maxAge || "");
  const [gender, setGender] = useState<Gender | null>(category?.gender || null);
  const [description, setDescription] = useState(category?.description || "");

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({});
    const newErrors: Record<string, string> = {};
    if (!name) {
      newErrors.name = "Debe ingresar un nombre";
    }
    if (!minAge) {
      newErrors.minAge = "Debe ingresar una edad mínima";
    }
    if (!maxAge) {
      newErrors.maxAge = "Debe ingresar una edad máxima";
    }
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) {
      return;
    }
    setIsLoading?.(true);
    let res;
    const data = {
      name,
      minAge: Number(minAge),
      maxAge: Number(maxAge),
      gender: gender!,
      description,
    };
    if (category) {
      res = await editCategory({ id: category.id, data });
    } else {
      res = await addCategory({ data });
    }
    setIsLoading?.(false);
    if (res.error) {
      toast.danger(res.message, {
        description: res.message,
      });
      if (res.errors) {
        setErrors(res.errors);
      }
      return;
    }
    toast.success(res.message, {
      description: category
        ? "La disciplina se ha agregado exitosamente"
        : "La disciplina se ha agregado exitosamente",
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
        <TextField
          isRequired
          className="w-full"
          name="minAge"
          type="number"
          isInvalid={!!errors.minAge || undefined}
        >
          <Label>Edad Mínima</Label>
          <Input
            variant="secondary"
            value={minAge}
            min={0}
            onChange={(e) => {
              setMinAge(e.target.value);
              setErrors({});
            }}
            placeholder="Ingrese la edad mínima"
          />
          <FieldError children={errors.minAge && <> {errors.minAge}</>} />
        </TextField>
        <TextField
          isRequired
          className="w-full"
          name="maxAge"
          type="number"
          isInvalid={!!errors.maxAge || undefined}
        >
          <Label>Edad Máxima</Label>
          <Input
            variant="secondary"
            value={maxAge}
            min={0}
            onChange={(e) => {
              setMaxAge(e.target.value);
              setErrors({});
            }}
            placeholder="Ingrese la edad máxima"
          />
          <FieldError children={errors.maxAge && <> {errors.maxAge}</>} />
        </TextField>

        {/* Genero */}
        <Select
          className="w-full"
          name="gender"
          placeholder="Seleccione un genero"
          variant="secondary"
          isInvalid={!!errors.gender || undefined}
          value={gender}
          onChange={(e) => {
            setGender((e?.toString() as Gender) || null);
            setErrors({});
          }}
        >
          <Label>Genero</Label>
          <Select.Trigger>
            <Select.Value />
            <Select.Indicator />
          </Select.Trigger>
          <Select.Popover>
            <ListBox>
              <ListBox.Item id="MALE" textValue="MALE">
                MASCULINO
                <ListBox.ItemIndicator />
              </ListBox.Item>
              <ListBox.Item id="FEMALE" textValue="FEMALE">
                FEMENINO
                <ListBox.ItemIndicator />
              </ListBox.Item>
              <ListBox.Item id="MIXED" textValue="MIXED">
                MIXTO
                <ListBox.ItemIndicator />
              </ListBox.Item>
            </ListBox>
          </Select.Popover>
          <FieldError children={errors.gender && <> {errors.gender}</>} />
        </Select>

        <TextField
          className="w-full"
          name="description"
          isInvalid={!!errors.description || undefined}
        >
          <Label>Descripción</Label>
          <TextArea
            variant="secondary"
            placeholder="Ingrese la descripción de la categoría"
            rows={4}
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
              setErrors({});
            }}
          />
          {/* <Description>Maximum 500 characters</Description> */}
          <FieldError
            children={errors.description && <> {errors.description}</>}
          />
        </TextField>
      </Form>
    </Surface>
  );
};
