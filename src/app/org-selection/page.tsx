import { OrganizationList } from "@clerk/nextjs";

type Props = object;

export default function OrgSelectionPage({}: Props) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <OrganizationList
        hidePersonal
        afterCreateOrganizationUrl={"/"}
        afterSelectOrganizationUrl={"/"}
        appearance={{
          elements: {
            rootBox: "mx-auto",
            card: "shadow-lg",
          },
        }}
      />
    </div>
  );
}
