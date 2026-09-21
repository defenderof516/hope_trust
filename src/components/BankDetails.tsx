"use client";

import { Building2, Check, Copy } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { bankAccount } from "@/data/site";

/** Fields a donor types into a transfer, in the order a bank form asks for them. */
const fields: { label: string; value: string; emphasis?: boolean }[] = [
  { label: "Account name", value: bankAccount.accountName },
  { label: "Bank", value: bankAccount.bank },
  { label: "Account number", value: bankAccount.accountNumber, emphasis: true },
  { label: "IFSC code", value: bankAccount.ifsc, emphasis: true },
  { label: "Branch code", value: bankAccount.branchCode },
  { label: "Branch address", value: bankAccount.address },
];

function CopyButton({ label, value }: { label: string; value: string }) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const copy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(value);
    } catch {
      // Clipboard access can be refused (insecure origin, permissions). The
      // value stays selectable on the page, so nothing is lost.
      return;
    }
    setCopied(true);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setCopied(false), 1800);
  }, [value]);

  return (
    <button
      type="button"
      onClick={copy}
      // Not lower-cased: it would turn "IFSC code" into "ifsc code".
      aria-label={copied ? `${label} copied` : `Copy ${label}`}
      className="focus-ring grid size-9 shrink-0 place-items-center rounded-full border border-ink/12 bg-white text-ink-soft transition hover:border-ink hover:bg-ink hover:text-white"
    >
      {copied ? <Check size={15} className="text-lime" /> : <Copy size={15} />}
    </button>
  );
}

/**
 * Hope Trust's donation account, presented as a transcribable card.
 *
 * Account number and IFSC are set in a tabular font and given extra tracking —
 * a donor copying them by eye must not confuse 0 with O.
 */
export default function BankDetails() {
  return (
    <div className="overflow-hidden rounded-[1.7rem] border border-ink/10 bg-white">
      <div className="flex items-center gap-3 border-b border-ink/10 bg-paper px-6 py-5">
        <span className="grid size-10 shrink-0 place-items-center rounded-full bg-cyan/15 text-cyan-dark">
          <Building2 size={19} />
        </span>
        <div>
          <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-ink-soft/65">
            Bank transfer
          </p>
          <p className="font-display text-xl font-bold leading-tight">
            {bankAccount.bank} · {bankAccount.branch}
          </p>
        </div>
      </div>

      <dl className="divide-y divide-ink/8">
        {fields.map((field) => (
          <div key={field.label} className="flex items-center gap-4 px-6 py-4">
            <div className="min-w-0 flex-1">
              <dt className="text-xs font-extrabold uppercase tracking-[0.12em] text-ink-soft/65">
                {field.label}
              </dt>
              <dd
                className={
                  field.emphasis
                    ? "mt-1.5 break-all font-mono text-lg font-bold tracking-[0.08em] text-ink sm:text-xl"
                    : "mt-1.5 break-words font-semibold text-ink"
                }
              >
                {field.value}
              </dd>
            </div>
            <CopyButton label={field.label} value={field.value} />
          </div>
        ))}
      </dl>
    </div>
  );
}
