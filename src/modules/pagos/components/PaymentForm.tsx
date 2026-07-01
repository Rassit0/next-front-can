"use client";

import {
  Button,
  Input,
  Select,
  Tab,
  Tabs,
  Card,
  Spinner,
} from "@heroui/react";
import { useState } from "react";
import { motion } from "framer-motion";
import { HugeiconsIcon } from "@hugeicons/react";
import { Send01Icon, ShieldIcon, AlertCircleIcon } from "@hugeicons/core-free-icons";
import { IMemberTeamSeasonAssignment } from "@/modules/membresias/types";
import { processPayment } from "@/modules/pagos/actions";
import { toast } from "@/utils/toast";

interface PaymentFormProps {
  assignment: IMemberTeamSeasonAssignment;
  onSuccess?: () => void;
  onError?: (error: string) => void;
}

// Luhn algorithm for card validation
const validateCardNumber = (num: string): boolean => {
  const digits = num.replace(/\D/g, "");
  if (digits.length < 13) return false;

  let sum = 0;
  let isEven = false;

  for (let i = digits.length - 1; i >= 0; i--) {
    let digit = parseInt(digits[i]);

    if (isEven) {
      digit *= 2;
      if (digit > 9) digit -= 9;
    }

    sum += digit;
    isEven = !isEven;
  }

  return sum % 10 === 0;
};

export const PaymentForm = ({
  assignment,
  onSuccess,
  onError,
}: PaymentFormProps) => {
  const [selectedTab, setSelectedTab] = useState<"card" | "transfer">("card");
  const [isLoading, setIsLoading] = useState(false);
  const [cardData, setCardData] = useState({
    cardNumber: "",
    cardHolder: "",
    expiryDate: "",
    cvv: "",
  });
  const [transferData, setTransferData] = useState({
    bankName: "",
    accountNumber: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const formatCardNumber = (value: string) => {
    const digits = value.replace(/\D/g, "");
    const formatted = digits.replace(/(\d{4})/g, "$1 ").trim();
    return formatted;
  };

  const formatExpiryDate = (value: string) => {
    const digits = value.replace(/\D/g, "");
    if (digits.length >= 2) {
      return `${digits.slice(0, 2)}/${digits.slice(2, 4)}`;
    }
    return digits;
  };

  const validateCardForm = () => {
    const newErrors: Record<string, string> = {};

    if (!cardData.cardNumber || !validateCardNumber(cardData.cardNumber)) {
      newErrors.cardNumber = "Número de tarjeta inválido";
    }
    if (!cardData.cardHolder) {
      newErrors.cardHolder = "Nombre del titular requerido";
    }
    if (!cardData.expiryDate || !/^\d{2}\/\d{2}$/.test(cardData.expiryDate)) {
      newErrors.expiryDate = "Fecha de vencimiento inválida (MM/YY)";
    }
    if (!cardData.cvv || !/^\d{3,4}$/.test(cardData.cvv)) {
      newErrors.cvv = "CVV inválido";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateTransferForm = () => {
    const newErrors: Record<string, string> = {};

    if (!transferData.bankName) {
      newErrors.bankName = "Banco requerido";
    }
    if (!transferData.accountNumber) {
      newErrors.accountNumber = "Número de cuenta requerido";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePayment = async () => {
    try {
      setIsLoading(true);

      let isValid = false;
      let payload: any = {
        assignmentId: assignment.id,
        amount: assignment.totalInitialCharges,
        method: selectedTab === "card" ? "credit-card" : "bank-transfer",
      };

      if (selectedTab === "card") {
        isValid = validateCardForm();
        if (!isValid) {
          toast.error("Validación fallida");
          return;
        }
        payload = { ...payload, ...cardData };
      } else {
        isValid = validateTransferForm();
        if (!isValid) {
          toast.error("Validación fallida");
          return;
        }
        payload = { ...payload, ...transferData };
      }

      const result = await processPayment(payload);

      if (result.error) {
        toast.error(result.message || "Error al procesar pago");
        onError?.(result.message);
      } else {
        toast.success(result.message);
        onSuccess?.();
      }
    } catch (error) {
      toast.error("Error al procesar pago");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="rounded-lg bg-accent/10 p-4 flex items-start gap-3"
      >
        <HugeiconsIcon icon={ShieldIcon} size={18} className="text-accent flex-shrink-0 mt-0.5" />
        <div className="text-sm text-accent">
          <p className="font-semibold">Pago Seguro</p>
          <p className="text-xs opacity-80">
            Tu información está encriptada y protegida
          </p>
        </div>
      </motion.div>

      <Card className="p-6 border border-border">
        <Tabs
          selectedKey={selectedTab}
          onSelectionChange={(key) => {
            setSelectedTab(key as "card" | "transfer");
            setErrors({});
          }}
          aria-label="Métodos de pago"
        >
          <Tab key="card" title="Tarjeta de Crédito">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="space-y-4 pt-4"
            >
              <Input
                label="Número de Tarjeta"
                placeholder="4532 1234 5678 9010"
                value={formatCardNumber(cardData.cardNumber)}
                onValueChange={(value) =>
                  setCardData({ ...cardData, cardNumber: value.replace(/\s/g, "") })
                }
                isInvalid={!!errors.cardNumber}
                errorMessage={errors.cardNumber}
                isDisabled={isLoading}
              />

              <Input
                label="Nombre del Titular"
                placeholder="Juan Pérez"
                value={cardData.cardHolder}
                onValueChange={(value) =>
                  setCardData({ ...cardData, cardHolder: value })
                }
                isInvalid={!!errors.cardHolder}
                errorMessage={errors.cardHolder}
                isDisabled={isLoading}
              />

              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="Vencimiento"
                  placeholder="MM/YY"
                  value={cardData.expiryDate}
                  onValueChange={(value) =>
                    setCardData({ ...cardData, expiryDate: formatExpiryDate(value) })
                  }
                  isInvalid={!!errors.expiryDate}
                  errorMessage={errors.expiryDate}
                  isDisabled={isLoading}
                />

                <Input
                  label="CVV"
                  placeholder="123"
                  type="password"
                  value={cardData.cvv}
                  onValueChange={(value) =>
                    setCardData({ ...cardData, cvv: value.replace(/\D/g, "").slice(0, 4) })
                  }
                  isInvalid={!!errors.cvv}
                  errorMessage={errors.cvv}
                  isDisabled={isLoading}
                />
              </div>
            </motion.div>
          </Tab>

          <Tab key="transfer" title="Transferencia Bancaria">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="space-y-4 pt-4"
            >
              <Select
                label="Banco"
                placeholder="Selecciona tu banco"
                selectedKeys={transferData.bankName ? [transferData.bankName] : []}
                onChange={(e) =>
                  setTransferData({ ...transferData, bankName: e.target.value })
                }
                isInvalid={!!errors.bankName}
                errorMessage={errors.bankName}
                isDisabled={isLoading}
              >
                <Select.Item key="banco-mercantil">Banco Mercantil</Select.Item>
                <Select.Item key="banco-bisa">Banco Bisa</Select.Item>
                <Select.Item key="banco-fassil">Banco Fassil</Select.Item>
                <Select.Item key="banco-ecb">Banco de Crédito Boliviano</Select.Item>
              </Select>

              <Input
                label="Número de Cuenta"
                placeholder="Ingresa tu número de cuenta"
                value={transferData.accountNumber}
                onValueChange={(value) =>
                  setTransferData({ ...transferData, accountNumber: value })
                }
                isInvalid={!!errors.accountNumber}
                errorMessage={errors.accountNumber}
                isDisabled={isLoading}
              />

              <div className="rounded-lg bg-warning/10 p-3 flex items-start gap-2">
                <HugeiconsIcon icon={AlertCircleIcon} size={16} className="text-warning flex-shrink-0 mt-0.5" />
                <p className="text-xs text-warning">
                  Recibirás instrucciones de transferencia bancaria por correo
                </p>
              </div>
            </motion.div>
          </Tab>
        </Tabs>
      </Card>

      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.1 }}
        className="flex gap-3"
      >
        <Button
          fullWidth
          color="primary"
          size="lg"
          onPress={handlePayment}
          isDisabled={isLoading}
          isLoading={isLoading}
          startContent={!isLoading && <HugeiconsIcon icon={Send01Icon} size={18} />}
        >
          {isLoading ? "Procesando..." : `Pagar ${new Intl.NumberFormat("es-BO", {
            style: "currency",
            currency: "BOB",
          }).format(assignment.totalInitialCharges)}`}
        </Button>
      </motion.div>
    </div>
  );
};
