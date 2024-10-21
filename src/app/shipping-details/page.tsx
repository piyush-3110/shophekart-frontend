import Button, { ButtonShape, ButtonType } from "@/components/shared/Button";
import { ComboboxDemo } from "@/components/ui/combobox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { Country } from "country-state-city";
import Footer from "@/components/Footer/Footer";
const countries = Country.getAllCountries().map(({ name }) => {
  return {
    label: name,
    value: name,
  };
});

interface ShippingField {
  id: string;
  label: string;
  type?: "email" | "tel" | "text";
  placeholder: string;
  className?: string;
  colSpan?: number;
}

const ShippingFields: ShippingField[] = [
  {
    id: "firstName",
    label: "First name",
    placeholder: "E.g. Jordan",
    type: "text",
  },
  {
    id: "lastName",
    label: "Last name",
    placeholder: "E.g. Smith",
    type: "text",
  },
  {
    id: "userEmail",
    label: "Email address",
    type: "email",
    placeholder: "E.g. jordan@mail.com",
  },
  {
    id: "phoneNumber",
    label: "Phone number",
    type: "tel",
    placeholder: "+ 156 555 2568",
  },

  {
    id: "country",
    label: "Country",
    placeholder: "Select the country",
    type: "text",
  },

  {
    id: "postalCode",
    label: "Postal code",
    placeholder: "62805",
    type: "text",
  },
  {
    id: "address",
    label: "Address",
    placeholder: "Enter your address here...",
    colSpan: 2,
    type: "text",
  },

  {
    id: "state",
    label: "State/Province",
    placeholder: "New York ",
    type: "text",
  },
];

const Page = () => {
  return (
    <main className="mt-4 py-10">
      <h1 className="bg-[#F4F6FA] text-center text-3xl font-semibold py-7">
        Shipping details
      </h1>
      <section className="px-4 lg:px-36 mt-12">
        <form>
          <div className="space-y-10 grid sm:grid-cols-2 lg:grid-cols-3 sm:gap-y-8 lg:gap-y-14 gap-x-12">
            {ShippingFields.map((field: ShippingField, index: number) => (
              <div
                key={index}
                className={cn(
                  `flex flex-col gap-2`,
                  field.colSpan && `col-span-${field.colSpan}`
                )}
              >
                <Label htmlFor={field.id} className="text-[#6F8294]">
                  {field.label}
                </Label>
                {field.label === "Country" ? (
                  <ComboboxDemo
                    data={countries}
                    notFoundText="No country found"
                    placeholder={field.placeholder}
                  />
                ) : (
                  <Input
                    id={field.id}
                    type={field.type ?? "text"}
                    placeholder={field.placeholder}
                    className={cn(
                      `border placeholder:text-[#6F8294] bg-[##F9FBFC]`,
                      field.className
                    )}
                  />
                )}
              </div>
            ))}
          </div>
          <p className="text-[#6B6F93] mt-8">
            (These details will only be shared with sellers so they know what
            address to ship items to. You can change this data at any time. They
            are not shared with anyone publicly)
          </p>
          <Button
            type={ButtonType.SUBMIT}
            shape={ButtonShape.ROUND}
            className="mt-8"
          >
            Confirm and save
          </Button>
        </form>
      </section>
      <Footer/>
    </main>
  );
};

export default Page;
