"use client";

import { useState, useEffect } from "react";
import { CreateResourceInput } from "@/types";
import { categories } from "@/data/categories";
import { useResources } from "@/lib/resource-context";
import { useUI } from "@/lib/ui-context";
import { Modal } from "@/components/ui/modal";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CategoryIcon } from "@/components/ui/category-icon";
import { cn } from "@/lib/utils";

const emptyForm: CreateResourceInput = {
  name: "",
  url: "",
  description: "",
  whatItDoes: "",
  whyUseIt: "",
  whenToUseIt: "",
  howToUseIt: "",
  categories: [],
  tags: [],
  purpose: "",
  featured: false,
};

interface AddResourceFormProps {
  open: boolean;
  onClose: () => void;
  initialData?: Partial<CreateResourceInput>;
  editId?: string;
}

export function AddResourceForm({ open, onClose, initialData, editId }: AddResourceFormProps) {
  const { addResource, updateResource, getResourceById } = useResources();
  const [form, setForm] = useState<CreateResourceInput>(emptyForm);
  const [tagInput, setTagInput] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (open && editId) {
      const resource = getResourceById(editId);
      if (resource) {
        setForm({
          name: resource.name,
          url: resource.url,
          description: resource.description,
          whatItDoes: resource.whatItDoes,
          whyUseIt: resource.whyUseIt,
          whenToUseIt: resource.whenToUseIt,
          howToUseIt: resource.howToUseIt,
          categories: resource.categories,
          tags: resource.tags,
          purpose: resource.purpose,
          featured: resource.featured,
        });
      }
    } else if (open && initialData) {
      setForm({ ...emptyForm, ...initialData });
    } else if (open) {
      setForm(emptyForm);
    }
    setErrors({});
    setTagInput("");
  }, [open, editId, initialData, getResourceById]);

  const updateField = <K extends keyof CreateResourceInput>(
    key: K,
    value: CreateResourceInput[K]
  ) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: "" }));
  };

  const toggleCategory = (id: string) => {
    updateField(
      "categories",
      form.categories.includes(id)
        ? form.categories.filter((c) => c !== id)
        : [...form.categories, id]
    );
  };

  const addTag = () => {
    const tag = tagInput.trim().replace(/^#/, "");
    if (tag && !form.tags.includes(tag)) {
      updateField("tags", [...form.tags, tag]);
    }
    setTagInput("");
  };

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (!form.name.trim()) newErrors.name = "Name is required";
    if (!form.url.trim()) newErrors.url = "URL is required";
    else {
      try {
        new URL(form.url);
      } catch {
        newErrors.url = "Enter a valid URL";
      }
    }
    if (!form.description.trim()) newErrors.description = "Description is required";
    if (form.categories.length === 0) newErrors.categories = "Select at least one category";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    if (editId) {
      updateResource({ id: editId, ...form });
    } else {
      addResource(form);
    }
    onClose();
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={editId ? "Edit Resource" : "Add Resource"}
      description="Register a new tool or reference to the vault."
      size="lg"
    >
      <form onSubmit={handleSubmit} className="space-y-4 font-sans text-xs">
        <div className="grid gap-3 sm:grid-cols-2">
          <Field label="RESOURCE NAME" error={errors.name}>
            <Input
              value={form.name}
              onChange={(e) => updateField("name", e.target.value)}
              placeholder="e.g. Motion.dev"
            />
          </Field>
          <Field label="WEBSITE URL" error={errors.url}>
            <Input
              value={form.url}
              onChange={(e) => updateField("url", e.target.value)}
              placeholder="https://motion.dev"
            />
          </Field>
        </div>

        <Field label="DESCRIPTION" error={errors.description}>
          <Textarea
            value={form.description}
            onChange={(e) => updateField("description", e.target.value)}
            placeholder="Concise summary of what this tool does..."
            rows={2}
          />
        </Field>

        {(["whatItDoes", "whyUseIt", "whenToUseIt", "howToUseIt"] as const).map((field) => (
          <Field
            key={field}
            label={field.replace(/([A-Z])/g, " $1").toUpperCase()}
          >
            <Textarea
              value={form[field]}
              onChange={(e) => updateField(field, e.target.value)}
              rows={2}
            />
          </Field>
        ))}

        <Field label="PURPOSE">
          <Input
            value={form.purpose}
            onChange={(e) => updateField("purpose", e.target.value)}
            placeholder="Primary use case and design purpose..."
          />
        </Field>

        <Field label="CATEGORIES" error={errors.categories}>
          <div className="flex flex-wrap gap-1.5 max-h-32 overflow-y-auto p-1 border border-[var(--border)] rounded-lg bg-[var(--surface-hover)]">
            {categories.map((cat) => {
              const selected = form.categories.includes(cat.id);
              return (
                <button
                  type="button"
                  key={cat.id}
                  onClick={() => toggleCategory(cat.id)}
                  className={cn(
                    "inline-flex items-center gap-1.5 px-2 py-1 rounded-md text-[11px] font-sans transition-colors cursor-pointer",
                    selected
                      ? "bg-[var(--accent)] text-white font-semibold shadow-2xs"
                      : "bg-[var(--surface)] border border-[var(--border)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                  )}
                >
                  <span className="h-3 w-3 shrink-0 flex items-center justify-center">
                    <CategoryIcon id={cat.id} className="h-3 w-3" />
                  </span>
                  <span>{cat.name}</span>
                </button>
              );
            })}
          </div>
        </Field>

        <Field label="TAGS">
          <div className="flex gap-2">
            <Input
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  addTag();
                }
              }}
              placeholder="Type tag and press Add"
            />
            <Button type="button" variant="outline" size="sm" onClick={addTag}>
              Add
            </Button>
          </div>
          {form.tags.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-1.5 font-mono">
              {form.tags.map((tag) => (
                <Badge
                  key={tag}
                  variant="secondary"
                  onClick={() =>
                    updateField(
                      "tags",
                      form.tags.filter((t) => t !== tag)
                    )
                  }
                  className="cursor-pointer"
                >
                  #{tag} ×
                </Badge>
              ))}
            </div>
          )}
        </Field>

        <label className="flex items-center gap-2 text-xs text-[var(--text-secondary)] cursor-pointer pt-1 select-none">
          <input
            type="checkbox"
            checked={form.featured}
            onChange={(e) => updateField("featured", e.target.checked)}
            className="rounded border-[var(--border)] accent-[var(--accent)]"
          />
          <span>Mark as Featured Resource</span>
        </label>

        <div className="flex justify-end gap-2 pt-3 border-t border-[var(--border)]">
          <Button type="button" variant="ghost" size="sm" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" size="sm">{editId ? "Save Changes" : "Add to Vault"}</Button>
        </div>
      </form>
    </Modal>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="mb-1 block font-mono text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)]">
        {label}
      </label>
      {children}
      {error && <p className="mt-1 font-mono text-[10px] text-[var(--error)]">{error}</p>}
    </div>
  );
}

export function AddResourceModal() {
  const { addResourceOpen, setAddResourceOpen, editingResourceId, setEditingResourceId } = useUI();

  return (
    <AddResourceForm
      open={addResourceOpen || !!editingResourceId}
      onClose={() => {
        setAddResourceOpen(false);
        setEditingResourceId(null);
      }}
      editId={editingResourceId ?? undefined}
    />
  );
}
