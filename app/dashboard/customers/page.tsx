import { Metadata } from "next";
import { lusitana } from "@/app/ui/fonts";
import {
  fetchFilteredCustomers,
  fetchCustomers,
  fetchCustomerPages,
} from "@/app/lib/data";
import CustomersTable from "@/app/ui/customers/table";
import { Suspense } from "react";
import Search from "@/app/ui/search";
import { TableSkeleton } from "@/app/ui/skeletons";
import Pagination from "@/app/ui/invoices/pagination";
export const metadata: Metadata = {
  title: "Customers",
};
export default async function Page(props: {
  searchParams?: Promise<{ query?: string; page?: number }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || "";
  // const total = await (await fetchCustomers()).length;
  const totalPages = await fetchCustomerPages(query);
  console.log(totalPages);
  console.log("searchParams on customers", searchParams);
  const customers = await fetchFilteredCustomers(
    query,
    searchParams?.page || 1
  );
  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>Customers</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search customers..." />
      </div>
      <Suspense fallback={<TableSkeleton />}>
        <CustomersTable customers={customers} />
      </Suspense>
      {totalPages > 1 && (
        <div className="mt-5 flex w-full justify-center">
          <Pagination totalPages={totalPages} />
        </div>
      )}
      {/* <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div> */}
    </div>
  );
}
