"use client";
import { iconMap } from "@/utils/iconMap";
import {
  Calendar,
  DateField,
  DatePicker,
  Description,
  ErrorMessage,
  FieldError,
  Form,
  Input,
  Label,
  ListBox,
  Surface,
  Tag,
  TagGroup,
  TextField,
  toast,
  ToggleButton,
  Select,
} from "@heroui/react";
import React, { useState } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Add01Icon,
  CameraAdd01Icon,
  UserIcon,
} from "@hugeicons/core-free-icons";
import { SectionInfo } from "./SectionInfo";
import { SectionProfiles } from "./SectionProfiles";
import { addPerson, editPerson, IPerson, UniformSize } from "@/modules/persons";
import type { DateValue } from "@internationalized/date";
import {
  fromDate,
  getLocalTimeZone,
  parseAbsolute,
  parseAbsoluteToLocal,
  parseDate,
  today,
} from "@internationalized/date";

interface Props {
  person?: IPerson;
  formId: string;
  onSubmited?: () => void;
  isLoading?: boolean;
  setIsLoading?: (value: boolean) => void;
}
export const FormMember = ({
  person,
  formId,
  onSubmited,
  isLoading,
  setIsLoading,
}: Props) => {
  const [ci, setCi] = useState(person?.ci || "");
  const [name, setName] = useState(person?.name || "");
  const [lastName, setLastName] = useState(person?.lastName || "");
  const [surName, setSurName] = useState(person?.surName || "");
  const [email, setEmail] = useState(person?.email || "");
  const [phone, setPhone] = useState(person?.phone || "");
  const [phoneEmergency, setPhoneEmergency] = useState(
    person?.phoneEmergency || "",
  );
  const [address, setAddress] = useState(person?.address || "");
  // const [birthDate, setBirthDate] = useState<DateValue | null>(
  //   today(getLocalTimeZone()),
  // );
  const [birthDate, setBirthDate] = useState<DateValue | null>(
    person?.birthDate
      ? parseDate(person.birthDate.toISOString().split("T")[0])
      : null,
  );
  const [standardSize, setStandardSize] = useState<UniformSize | null>(
    person?.standardSize || null,
  );
  const [image, setImage] = useState<File | null>(null);
  const [tutorIds, setTutorIds] = useState<number[]>(
    person?.tutors.map((item) => item.tutor.id) || [],
  );

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleRemoveError = (fieldName: string) => {
    // Limpiar solo el error de este campo específico
    if (errors[fieldName]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[fieldName];
        return newErrors;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({});
    const newErrors: Record<string, string> = {};
    // if (!icon) {
    //   newErrors.icon = "Debe seleccionar un icono";
    // }
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) {
      return;
    }
    setIsLoading?.(true);
    let res;
    const data = {
      ci,
      name,
      lastName,
      surName,
      email,
      phone,
      phoneEmergency,
      address,
      birthDate: birthDate?.toDate(getLocalTimeZone()),
      standardSize: standardSize || undefined,
      image: image ? image : undefined,
      tutorIds: tutorIds,
    };
    if (person) {
      res = await editPerson({ id: person.id, data });
    } else {
      res = await addPerson({
        data,
      });
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
      description: person
        ? "La persona se ha editado exitosamente"
        : "La persona se ha agregado exitosamente",
    });
    onSubmited?.();
  };
  return (
    <Surface variant="transparent">
      <Form
        id={formId}
        onSubmit={handleSubmit}
        className="flex flex-col md:flex-row gap-4"
      >
        {/* <!-- Basic Information: Bento Layout --> */}
        <div className="flex flex-col gap-8">
          {/* Sección de Foto (Compacta pero llamativa) */}
          <div className="flex flex-col sm:flex-row items-center gap-6 bg-surface-container-low p-6 rounded-2xl border border-outline-variant/30">
            <div className="relative group shrink-0">
              <div className="w-24 h-24 rounded-full bg-background border-4 border-background shadow-inner flex items-center justify-center overflow-hidden">
                <HugeiconsIcon
                  icon={UserIcon}
                  className="h-12 w-12 text-on-surface-variant"
                />
              </div>
              <button
                className="absolute bottom-0 right-0 bg-primary text-on-primary p-2 rounded-full shadow-lg hover:scale-105 active:scale-95 transition-all"
                type="button"
              >
                <HugeiconsIcon icon={CameraAdd01Icon} className="h-4 w-4" />
              </button>
            </div>
            <div className="text-center sm:text-left">
              <h3 className="font-headline font-bold text-lg">
                Foto de Perfil
              </h3>
              <p className="text-sm text-on-surface-variant">
                Sube una foto profesional para la identificación institucional.
                Tamaño máximo: 5 MB.
              </p>
            </div>
          </div>

          {/* Formulario (Grid optimizado) */}
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-6 bg-primary rounded-full"></div>
              <h2 className="font-headline text-xl font-bold">
                Información Básica
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* Nombre */}
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
                    handleRemoveError("name");
                  }}
                  placeholder="Ingrese el nombre"
                />
                <FieldError children={errors.name && <> {errors.name}</>} />
              </TextField>

              {/* Apellido Paterno */}
              <TextField
                isRequired
                className="w-full"
                name="lastName"
                type="text"
                isInvalid={!!errors.lastName || undefined}
              >
                <Label>Apellido Paterno</Label>
                <Input
                  variant="secondary"
                  value={lastName}
                  onChange={(e) => {
                    setLastName(e.target.value);
                    handleRemoveError("lastName");
                  }}
                  placeholder="Ingrese el primer apellido"
                />
                <FieldError
                  children={errors.lastName && <> {errors.lastName}</>}
                />
              </TextField>

              {/* Apellido Materno */}
              <TextField
                className="w-full"
                name="surName"
                type="text"
                isInvalid={!!errors.surName || undefined}
              >
                <Label>Apellido Materno</Label>
                <Input
                  variant="secondary"
                  value={surName}
                  onChange={(e) => {
                    setSurName(e.target.value);
                    handleRemoveError("surName");
                  }}
                  placeholder="Ingrese el segundo apellido"
                />
                <FieldError
                  children={errors.surName && <> {errors.surName}</>}
                />
              </TextField>

              {/* Campo: CI */}
              <TextField
                isRequired
                className="w-full"
                name="ci"
                type="text"
                isInvalid={!!errors.ci || undefined}
              >
                <Label>CI</Label>
                <Input
                  variant="secondary"
                  value={ci}
                  onChange={(e) => {
                    setCi(e.target.value);
                    handleRemoveError("ci");
                  }}
                  placeholder="Ingrese el nombre del rol"
                />
                <FieldError children={errors.ci && <> {errors.ci}</>} />
              </TextField>

              {/* Fecha de Nacimiento */}
              <DatePicker
                // isRequired
                isInvalid={!!errors.birthDate || undefined}
                name="birthDate"
                value={birthDate}
                onChange={(e) => {
                  setBirthDate(e);
                  handleRemoveError("birthDate");
                }}
              >
                <Label>Fecha de Nacimiento</Label>
                <DateField.Group fullWidth variant="secondary">
                  <DateField.Input>
                    {(segment) => <DateField.Segment segment={segment} />}
                  </DateField.Input>
                  <DateField.Suffix>
                    <DatePicker.Trigger>
                      <DatePicker.TriggerIndicator />
                    </DatePicker.Trigger>
                  </DateField.Suffix>
                </DateField.Group>
                <FieldError
                  children={errors.birthDate && <> {errors.birthDate}</>}
                />
                <DatePicker.Popover>
                  <Calendar aria-label="Event date">
                    <Calendar.Header>
                      <Calendar.YearPickerTrigger>
                        <Calendar.YearPickerTriggerHeading />
                        <Calendar.YearPickerTriggerIndicator />
                      </Calendar.YearPickerTrigger>
                      <Calendar.NavButton slot="previous" />
                      <Calendar.NavButton slot="next" />
                    </Calendar.Header>
                    <Calendar.Grid>
                      <Calendar.GridHeader>
                        {(day) => (
                          <Calendar.HeaderCell>{day}</Calendar.HeaderCell>
                        )}
                      </Calendar.GridHeader>
                      <Calendar.GridBody>
                        {(date) => <Calendar.Cell date={date} />}
                      </Calendar.GridBody>
                    </Calendar.Grid>
                    <Calendar.YearPickerGrid>
                      <Calendar.YearPickerGridBody>
                        {({ year }) => <Calendar.YearPickerCell year={year} />}
                      </Calendar.YearPickerGridBody>
                    </Calendar.YearPickerGrid>
                  </Calendar>
                </DatePicker.Popover>
              </DatePicker>

              {/* Phone */}
              <TextField
                className="w-full"
                name="phone"
                type="tel"
                isInvalid={!!errors.phone || undefined}
              >
                <Label>Telefono</Label>
                <Input
                  variant="secondary"
                  value={phone}
                  onChange={(e) => {
                    setPhone(e.target.value);
                    handleRemoveError("phone");
                  }}
                  placeholder="Ingrese el telefono"
                />
                <FieldError children={errors.phone && <> {errors.phone}</>} />
              </TextField>

              {/* phoneEmergency */}
              <TextField
                className="w-full"
                name="phoneEmergency"
                type="tel"
                isInvalid={!!errors.phoneEmergency || undefined}
              >
                <Label>Telefono de Emergencia</Label>
                <Input
                  variant="secondary"
                  value={phoneEmergency}
                  onChange={(e) => {
                    setPhoneEmergency(e.target.value);
                    handleRemoveError("phoneEmergency");
                  }}
                  placeholder="Ingrese el telefono de emergencia"
                />
                <FieldError
                  children={
                    errors.phoneEmergency && <> {errors.phoneEmergency}</>
                  }
                />
              </TextField>

              {/* address */}
              <TextField
                className="w-full"
                name="address"
                type="text"
                isInvalid={!!errors.address || undefined}
              >
                <Label>Direccion</Label>
                <Input
                  variant="secondary"
                  value={address}
                  onChange={(e) => {
                    setAddress(e.target.value);
                    handleRemoveError("address");
                  }}
                  placeholder="Ingrese la direccion"
                />
                <FieldError
                  children={errors.address && <> {errors.address}</>}
                />
              </TextField>

              {/* Email */}
              <TextField
                className="w-full"
                name="email"
                type="email"
                isInvalid={!!errors.email || undefined}
              >
                <Label>Email</Label>
                <Input
                  variant="secondary"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    handleRemoveError("email");
                  }}
                  placeholder="Ingrese el email"
                />
                <FieldError children={errors.email && <> {errors.email}</>} />
              </TextField>

              {/* Talla Estandar */}
              <Select
                className="w-full"
                name="standardSize"
                placeholder="Seleccione una talla"
                variant="secondary"
                isInvalid={!!errors.standardSize || undefined}
                value={standardSize}
                onChange={(e) => {
                  setStandardSize((e?.toString() as UniformSize) || "");
                  setErrors({});
                }}
              >
                <Label>Talla Estandar</Label>
                <Select.Trigger>
                  <Select.Value />
                  <Select.Indicator />
                </Select.Trigger>
                <Select.Popover>
                  <ListBox>
                    <ListBox.Item
                      id="XS"
                      textValue="XS"
                      onPress={() => {
                        if (standardSize === "XS") {
                          setStandardSize(null);
                        }
                      }}
                    >
                      XS
                      <ListBox.ItemIndicator />
                    </ListBox.Item>
                    <ListBox.Item
                      id="S"
                      textValue="S"
                      onPress={() => {
                        if (standardSize === "S") {
                          setStandardSize(null);
                        }
                      }}
                    >
                      S
                      <ListBox.ItemIndicator />
                    </ListBox.Item>
                    <ListBox.Item
                      id="M"
                      textValue="M"
                      onPress={() => {
                        if (standardSize === "M") {
                          setStandardSize(null);
                        }
                      }}
                    >
                      M
                      <ListBox.ItemIndicator />
                    </ListBox.Item>
                    <ListBox.Item
                      id="L"
                      textValue="L"
                      onPress={() => {
                        if (standardSize === "L") {
                          setStandardSize(null);
                        }
                      }}
                    >
                      L
                      <ListBox.ItemIndicator />
                    </ListBox.Item>
                    <ListBox.Item
                      id="XL"
                      textValue="XL"
                      onPress={() => {
                        if (standardSize === "XL") {
                          setStandardSize(null);
                        }
                      }}
                    >
                      XL
                      <ListBox.ItemIndicator />
                    </ListBox.Item>
                    <ListBox.Item
                      id="XXL"
                      textValue="XXL"
                      onPress={() => {
                        if (standardSize === "XXL") {
                          setStandardSize(null);
                        }
                      }}
                    >
                      XXL
                      <ListBox.ItemIndicator />
                    </ListBox.Item>
                    <ListBox.Item
                      id="XXXL"
                      textValue="XXXL"
                      onPress={() => {
                        if (standardSize === "XXXL") {
                          setStandardSize(null);
                        }
                      }}
                    >
                      XXXL
                      <ListBox.ItemIndicator />
                    </ListBox.Item>
                  </ListBox>
                </Select.Popover>
                <FieldError
                  children={errors.standardSize && <> {errors.standardSize}</>}
                />
              </Select>
            </div>
          </div>
        </div>
      </Form>
    </Surface>
  );
};
