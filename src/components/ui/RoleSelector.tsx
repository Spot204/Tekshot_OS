import React from "react";
import { Card, Form } from "react-bootstrap";

export interface RoleOption {
  value: string;
  title: string;
  description: string;
}

interface RoleSelectorProps {
  options: RoleOption[];
  value: string[];
  onChange: (value: string[]) => void;
}

const RoleSelector: React.FC<RoleSelectorProps> = ({
  options,
  value,
  onChange,
}) => {
  const handleSelect = (role: string) => {
    if (value.includes(role)) {
      onChange(value.filter((item) => item !== role));
    } else {
      onChange([...value, role]);
    }
  };

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(2, 220px)",
        gap: 16,
      }}
    >
      {options.map((item) => {
        const selected = value.includes(item.value);

        return (
          <Card
            key={item.value}
            onClick={() => handleSelect(item.value)}
            style={{
              cursor: "pointer",
              borderRadius: 12,
              border: selected ? "2px solid #0d6efd" : "1px solid #dee2e6",
              transition: ".2s",
            }}
          >
            <Card.Body
              style={{
                position: "relative",
                textAlign: "center",
                padding: 24,
              }}
            >
              <Form.Check
                checked={selected}
                readOnly
                style={{
                  position: "absolute",
                  top: 16,
                  left: 16,
                }}
              />

              <h5>{item.title}</h5>

              <div
                style={{
                  color: "#6c757d",
                  fontSize: 14,
                }}
              >
                {item.description}
              </div>
            </Card.Body>
          </Card>
        );
      })}
    </div>
  );
};

export default RoleSelector;
