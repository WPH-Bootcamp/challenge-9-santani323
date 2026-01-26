/**
 * Format number atau string menjadi Rupiah (IDR)
 * Contoh:
 * formatRupiah(15000) => "Rp15.000"
 * formatRupiah("15000") => "Rp15.000"
 */

export function formatRupiah(
  value: number | string,
  withPrefix: boolean = true
): string {
  if (value === null || value === undefined) return withPrefix ? "Rp0" : "0";

  const number =
    typeof value === "string"
      ? parseInt(value.replace(/[^0-9]/g, ""), 10)
      : value;

  if (isNaN(number)) return withPrefix ? "Rp0" : "0";

  const formatted = number.toLocaleString("id-ID");

  return withPrefix ? `Rp${formatted}` : formatted;
}
