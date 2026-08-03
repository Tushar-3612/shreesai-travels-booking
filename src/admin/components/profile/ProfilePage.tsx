"use client";

import { useEffect, useState } from "react";
import { FiKey, FiLock, FiMail, FiSave, FiUser } from "react-icons/fi";
import { changePasswordRequest, getMe, updateProfileRequest } from "../../lib/auth";
import { toast } from "../../lib/toast";
import Card from "../ui/Card";
import PageHeader from "../ui/PageHeader";
import { Field, TextInput } from "../ui/Field";
import ImageUpload from "../ui/ImageUpload";

export default function ProfilePage() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [savingProfile, setSavingProfile] = useState(false);
  const [savingPassword, setSavingPassword] = useState(false);

  useEffect(() => {
    getMe().then((me) => {
      if (me?.ok) {
        setEmail(me.email ?? "");
        setName(me.name ?? "");
        setPhotoUrl(me.photoUrl ?? "");
      }
    });
  }, []);

  const saveProfile = async () => {
    if (!name.trim()) {
      toast("Name cannot be empty", "error");
      return;
    }
    setSavingProfile(true);
    const result = await updateProfileRequest({ name, photoUrl });
    setSavingProfile(false);
    if (!result.ok) {
      toast(result.error || "Failed to update profile", "error");
      return;
    }
    toast("Profile updated successfully");
  };

  const savePassword = async () => {
    if (newPassword !== confirmPassword) {
      toast("New passwords do not match", "error");
      return;
    }
    if (newPassword.length < 6) {
      toast("New password must be at least 6 characters", "error");
      return;
    }
    setSavingPassword(true);
    const result = await changePasswordRequest(currentPassword, newPassword);
    setSavingPassword(false);
    if (!result.ok) {
      toast(result.error || "Failed to change password", "error");
      return;
    }
    toast("Password changed successfully");
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  return (
    <div>
      <PageHeader title="Profile" subtitle="Your admin account details" />

      <div className="grid lg:grid-cols-2 gap-6">
        <Card title="Account Information" subtitle="Name, email and profile photo">
          <div className="space-y-5">
            <div className="flex items-center gap-5">
              {photoUrl ? (
                <img src={photoUrl} alt={name} className="w-20 h-20 rounded-2xl object-cover border border-slate-200" />
              ) : (
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-700 text-white text-2xl font-bold flex items-center justify-center">
                  {name.split(/\s+/).map((p) => p[0]).join("").slice(0, 2).toUpperCase()}
                </div>
              )}
              <div>
                <p className="text-base font-extrabold text-slate-900">{name || "Administrator"}</p>
                <p className="text-xs text-slate-400 flex items-center gap-1.5 mt-0.5">
                  <FiMail size={12} />
                  {email}
                </p>
                <p className="text-[11px] text-slate-400 mt-1">Administrator role</p>
              </div>
            </div>
            <Field label="Photo" hint="Upload a new photo - it appears in the sidebar and topbar">
              <ImageUpload value={photoUrl} onChange={setPhotoUrl} label="Upload Profile Photo" />
            </Field>
            <Field label="Full Name" required>
              <TextInput
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
              />
            </Field>
            <Field label="Email" hint="Email is used to log in and cannot be changed here">
              <TextInput value={email} disabled className="bg-slate-50 text-slate-500" />
            </Field>
            <button
              className="adm-btn adm-btn-primary"
              onClick={saveProfile}
              disabled={savingProfile}
            >
              <FiSave size={15} />
              {savingProfile ? "Saving..." : "Save Profile"}
            </button>
          </div>
        </Card>

        <Card title="Change Password" subtitle="Update your login password">
          <div className="space-y-5">
            <Field label="Current Password" required>
              <div className="relative">
                <FiLock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <TextInput
                  type="password"
                  className="pl-10"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  placeholder="Enter current password"
                  autoComplete="current-password"
                />
              </div>
            </Field>
            <Field label="New Password" required hint="Minimum 6 characters">
              <div className="relative">
                <FiKey size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <TextInput
                  type="password"
                  className="pl-10"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Enter new password"
                  autoComplete="new-password"
                />
              </div>
            </Field>
            <Field label="Confirm New Password" required>
              <div className="relative">
                <FiKey size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <TextInput
                  type="password"
                  className="pl-10"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Re-enter new password"
                  autoComplete="new-password"
                />
              </div>
            </Field>
            <div className="rounded-xl bg-blue-50 border border-blue-100 px-4 py-3 flex items-start gap-2.5">
              <FiUser size={15} className="text-blue-600 mt-0.5 shrink-0" />
              <p className="text-xs text-blue-700 leading-relaxed">
                After changing your password, you will keep your current session.
                Use the new password the next time you log in.
              </p>
            </div>
            <button
              className="adm-btn adm-btn-primary"
              onClick={savePassword}
              disabled={savingPassword || !currentPassword || !newPassword}
            >
              <FiKey size={15} />
              {savingPassword ? "Changing..." : "Change Password"}
            </button>
          </div>
        </Card>
      </div>
    </div>
  );
}
