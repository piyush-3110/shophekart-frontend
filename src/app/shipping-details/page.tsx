import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const Page = () => {
  return (
    <main className="mt-4">
      <h1 className="bg-[#F4F6FA] text-center text-3xl font-semibold py-7 ">
        Shipping details
      </h1>
      <section className="px-36 mt-12">
        <form className="grid grid-cols-3 gap-y-14 gap-x-12">
          <div className="space-y-2">
            <Label htmlFor="firstName" className="text-[#6F8294]">
              First name
            </Label>
            <Input
              id="firstName"
              placeholder="E.g. Jordan"
              className="border placeholder:text-[#6F8294] bg-[#F9FBFC]"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="lastName" className="text-[#6F8294]">
              Last name
            </Label>
            <Input
              id="lastName"
              placeholder="E.g. Smith"
              className="border placeholder:text-[#6F8294] bg-[#F9FBFC]"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="userEmail" className="text-[#6F8294]">
              Email address
            </Label>
            <Input
              id="userEmail"
              type="email"
              placeholder="E.g. jordan@mail.com"
              className="border placeholder:text-[#6F8294] bg-[#F9FBFC]"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phoneNumber" className="text-[#6F8294]">
              Phone number
            </Label>
            <Input
              id="phoneNumber"
              placeholder="+ 156 555 2568"
              className="border placeholder:text-[#6F8294] bg-[#F9FBFC]"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="firstName" className="text-[#6F8294]">
              First name
            </Label>
            <Input
              id="firstName"
              placeholder="E.g. Jordan"
              className="border placeholder:text-[#6F8294] bg-[#F9FBFC]"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="firstName" className="text-[#6F8294]">
              First name
            </Label>
            <Input
              id="firstName"
              placeholder="E.g. Jordan"
              className="border placeholder:text-[#6F8294] bg-[#F9FBFC]"
            />
          </div>
          <div className="space-y-2 col-span-2">
            <Label htmlFor="firstName" className="text-[#6F8294]">
              First name
            </Label>
            <Input
              id="firstName"
              placeholder="E.g. Jordan"
              className="border placeholder:text-[#6F8294] bg-[#F9FBFC]"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="firstName" className="text-[#6F8294]">
              First name
            </Label>
            <Input
              id="firstName"
              placeholder="E.g. Jordan"
              className="border placeholder:text-[#6F8294] bg-[#F9FBFC]"
            />
          </div>
        </form>
      </section>
    </main>
  );
};

export default Page;
