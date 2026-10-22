"use client";

import { useMemo, useState } from "react";
import { FiDollarSign, FiEdit2, FiPlus, FiTrash2, FiTruck, FiMapPin } from "react-icons/fi";
import { usePricing } from "../../lib/db";
import type {
  DestinationPricing,
  PricingConfig,
  VehiclePricing,
} from "../../types";
import { toast } from "../../lib/toast";
import Card from "../ui/Card";
import PageHeader from "../ui/PageHeader";
import Modal from "../ui/Modal";
import ConfirmDialog from "../ui/ConfirmDialog";
import { Field, Select, TextInput } from "../ui/Field";

type TabKey = "vehicle" | "destination" | "extra";

const EMPTY_VEHICLE: VehiclePricing = {
  id: "",
  vehicleId: "",
  name: "",
  type: "Sedan",
  capacity: 4,
  baseFare: 0,
  perKm: 0,
  perDay: 0,
  extraKmRate: 0,
  driverCharge: 0,
  status: "active",
};

const EMPTY_DESTINATION: DestinationPricing = {
  id: "",
  name: "",
  from: "Shirdi",
  distance: 0,
  oneWay: 0,
  roundTrip: 0,
  perDay: 0,
  additionalCharge: 0,
  status: "active",
};

const VEHICLE_TYPES = ["Sedan", "Hatchback", "SUV", "MUV", "Tempo Traveller", "Bus", "Electric"];

function clone(obj: unknown) {
  return JSON.parse(JSON.stringify(obj));
}

export default function PricingPage() {
  const { pricing, setPricing, save } = usePricing();
  const [tab, setTab] = useState<TabKey>("vehicle");
  const [saving, setSaving] = useState(false);

  const [vehicleModal, setVehicleModal] = useState(false);
  const [editingVehicle, setEditingVehicle] = useState<VehiclePricing | null>(null);
  const [vehicleForm, setVehicleForm] = useState<VehiclePricing>(EMPTY_VEHICLE);
  const [vehicleToDelete, setVehicleToDelete] = useState<VehiclePricing | null>(null);

  const [destinationModal, setDestinationModal] = useState(false);
  const [editingDestination, setEditingDestination] = useState<DestinationPricing | null>(null);
  const [destinationForm, setDestinationForm] = useState<DestinationPricing>(EMPTY_DESTINATION);
  const [destinationToDelete, setDestinationToDelete] = useState<DestinationPricing | null>(null);

  const vehicleNames = useMemo(
    () => (pricing?.vehiclePricing ?? []).map((v) => v.name).filter(Boolean),
    [pricing]
  );

  if (!pricing) {
    return (
      <div className="text-slate-500 p-10 text-center">Loading pricing configuration...</div>
    );
  }

  const patch = (partial: Partial<PricingConfig>) =>
    setPricing({ ...(pricing as PricingConfig), ...partial });

  const patchExtra = (partial: Partial<PricingConfig["extraCharges"]>) =>
    patch({ extraCharges: { ...pricing!.extraCharges, ...partial } });

  const patchCalculator = (partial: Partial<PricingConfig["calculator"]>) =>
    patch({ calculator: { ...pricing!.calculator, ...partial } });

  const handleSave = () => {
    if (!pricing) return;
    setSaving(true);
    setTimeout(() => {
      save(pricing);
      setSaving(false);
      toast("Pricing configuration saved");
    }, 300);
  };

  const openVehicle = (v?: VehiclePricing) => {
    if (v) {
      setEditingVehicle(v);
      setVehicleForm(clone(v));
    } else {
      setEditingVehicle(null);
      setVehicleForm({ ...EMPTY_VEHICLE, id: `vp-${Date.now().toString(36)}` });
    }
    setVehicleModal(true);
  };

  const saveVehicle = () => {
    if (!vehicleForm.name.trim()) {
      toast("Vehicle name is required", "error");
      return;
    }
    const value = { ...vehicleForm, name: vehicleForm.name.trim() };
    setPricing({
      ...pricing!,
      vehiclePricing: pricing!.vehiclePricing.some((v) => v.id === value.id)
        ? pricing!.vehiclePricing.map((v) => (v.id === value.id ? value : v))
        : [value, ...pricing!.vehiclePricing],
    });
    setVehicleModal(false);
    toast(editingVehicle ? "Vehicle pricing updated" : "Vehicle pricing added");
  };

  const confirmVehicleDelete = () => {
    if (!vehicleToDelete) return;
    setPricing({
      ...pricing!,
      vehiclePricing: pricing!.vehiclePricing.filter((v) => v.id !== vehicleToDelete.id),
    });
    toast("Vehicle pricing removed", "info");
    setVehicleToDelete(null);
  };

  const openDestination = (d?: DestinationPricing) => {
    if (d) {
      setEditingDestination(d);
      setDestinationForm(clone(d));
    } else {
      setEditingDestination(null);
      setDestinationForm({ ...EMPTY_DESTINATION, id: `dp-${Date.now().toString(36)}` });
    }
    setDestinationModal(true);
  };

  const saveDestination = () => {
    if (!destinationForm.name.trim()) {
      toast("Destination name is required", "error");
      return;
    }
    const value = { ...destinationForm, name: destinationForm.name.trim() };
    setPricing({
      ...pricing!,
      destinationPricing: pricing!.destinationPricing.some((x) => x.id === value.id)
        ? pricing!.destinationPricing.map((x) => (x.id === value.id ? value : x))
        : [value, ...pricing!.destinationPricing],
    });
    setDestinationModal(false);
    toast(editingDestination ? "Destination pricing updated" : "Destination pricing added");
  };

  const confirmDestinationDelete = () => {
    if (!destinationToDelete) return;
    setPricing({
      ...pricing!,
      destinationPricing: pricing!.destinationPricing.filter(
        (x) => x.id !== destinationToDelete.id
      ),
    });
    toast("Destination pricing removed", "info");
    setDestinationToDelete(null);
  };

  return (
    <div>
      <PageHeader
        title="Pricing & Calculator"
        subtitle="Control vehicle rates, destination pricing and the tour cost calculator"
        actions={
          <button className="adm-btn adm-btn-primary" onClick={handleSave} disabled={saving}>
            {saving ? "Saving..." : "Save Changes"}
          </button>
        }
      />

      <div className="flex gap-2 mb-6 overflow-x-auto adm-scroll">
        {([
          { key: "vehicle", label: "Vehicle Pricing", icon: FiTruck },
          { key: "destination", label: "Destination Pricing", icon: FiMapPin },
          { key: "extra", label: "Extra Charges & Calculator", icon: FiDollarSign },
        ] as const).map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`adm-tab inline-flex items-center gap-2 ${tab === t.key ? "active" : ""}`}
          >
            <t.icon size={14} />
            {t.label}
          </button>
        ))}
      </div>

      {tab === "vehicle" && (
        <Card bodyClassName="p-0">
          <div className="flex items-center justify-between gap-3 px-5 py-4 border-b border-slate-100">
            <div>
              <h3 className="text-base font-extrabold text-slate-900">Vehicle Pricing</h3>
              <p className="text-xs text-slate-500">
                Base fare, per-km, per-day, extra-km and driver charges used by the calculator.
              </p>
            </div>
            <button className="adm-btn adm-btn-outline adm-btn-sm" onClick={() => openVehicle()}>
              <FiPlus size={14} />
              Add Vehicle
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="adm-tbl">
              <thead>
                <tr>
                  <th>Vehicle</th>
                  <th>Type</th>
                  <th>Seats</th>
                  <th>Base</th>
                  <th>Per Km</th>
                  <th>Per Day</th>
                  <th>Extra Km</th>
                  <th>Driver</th>
                  <th>Status</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {pricing.vehiclePricing.length === 0 ? (
                  <tr>
                    <td colSpan={10} className="text-center text-slate-500 py-6">
                      No vehicle pricing configured yet.
                    </td>
                  </tr>
                ) : (
                  pricing.vehiclePricing.map((v) => (
                    <tr key={v.id}>
                      <td className="font-semibold text-slate-800">{v.name}</td>
                      <td>{v.type}</td>
                      <td>{v.capacity}</td>
                      <td>₹{v.baseFare}</td>
                      <td>₹{v.perKm}</td>
                      <td>₹{v.perDay}</td>
                      <td>₹{v.extraKmRate}</td>
                      <td>₹{v.driverCharge}</td>
                      <td>
                        <span className={`adm-badge ${v.status === "active" ? "adm-badge-green" : "adm-badge-rose"}`}>
                          {v.status}
                        </span>
                      </td>
                      <td className="text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button className="adm-icon-btn" title="Edit" onClick={() => openVehicle(v)}>
                            <FiEdit2 size={14} />
                          </button>
                          <button className="adm-icon-btn danger" title="Delete" onClick={() => setVehicleToDelete(v)}>
                            <FiTrash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {tab === "destination" && (
        <Card bodyClassName="p-0">
          <div className="flex items-center justify-between gap-3 px-5 py-4 border-b border-slate-100">
            <div>
              <h3 className="text-base font-extrabold text-slate-900">Destination Pricing</h3>
              <p className="text-xs text-slate-500">
                Distance and fixed one-way / round-trip / per-day prices per destination.
              </p>
            </div>
            <button className="adm-btn adm-btn-outline adm-btn-sm" onClick={() => openDestination()}>
              <FiPlus size={14} />
              Add Destination
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="adm-tbl">
              <thead>
                <tr>
                  <th>Destination</th>
                  <th>From</th>
                  <th>Distance</th>
                  <th>One Way</th>
                  <th>Round Trip</th>
                  <th>Per Day</th>
                  <th>Add. Charge</th>
                  <th>Status</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {pricing.destinationPricing.length === 0 ? (
                  <tr>
                    <td colSpan={9} className="text-center text-slate-500 py-6">
                      No destination pricing configured yet.
                    </td>
                  </tr>
                ) : (
                  pricing.destinationPricing.map((d) => (
                    <tr key={d.id}>
                      <td className="font-semibold text-slate-800">{d.name}</td>
                      <td>{d.from}</td>
                      <td>{d.distance} km</td>
                      <td>₹{d.oneWay}</td>
                      <td>₹{d.roundTrip}</td>
                      <td>₹{d.perDay}</td>
                      <td>₹{d.additionalCharge}</td>
                      <td>
                        <span className={`adm-badge ${d.status === "active" ? "adm-badge-green" : "adm-badge-rose"}`}>
                          {d.status}
                        </span>
                      </td>
                      <td className="text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button className="adm-icon-btn" title="Edit" onClick={() => openDestination(d)}>
                            <FiEdit2 size={14} />
                          </button>
                          <button className="adm-icon-btn danger" title="Delete" onClick={() => setDestinationToDelete(d)}>
                            <FiTrash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {tab === "extra" && (
        <div className="grid lg:grid-cols-2 gap-6">
          <Card title="Extra Charges" subtitle="Flat and per-unit charges applied to every estimate">
            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="Currency">
                <Select value={pricing.extraCharges.currency} onChange={(e) => patchExtra({ currency: e.target.value })}>
                  <option value="INR">INR (₹)</option>
                  <option value="USD">USD ($)</option>
                  <option value="EUR">EUR (€)</option>
                </Select>
              </Field>
              <Field label="Minimum Fare">
                <TextInput
                  type="number"
                  value={pricing.extraCharges.minFare}
                  onChange={(e) => patchExtra({ minFare: Number(e.target.value) || 0 })}
                />
              </Field>
              <Field label="Driver Allowance / day">
                <TextInput
                  type="number"
                  value={pricing.extraCharges.driverAllowance}
                  onChange={(e) => patchExtra({ driverAllowance: Number(e.target.value) || 0 })}
                />
              </Field>
              <Field label="Night Charge">
                <TextInput
                  type="number"
                  value={pricing.extraCharges.nightCharge}
                  onChange={(e) => patchExtra({ nightCharge: Number(e.target.value) || 0 })}
                />
              </Field>
              <Field label="Toll Charges">
                <TextInput
                  type="number"
                  value={pricing.extraCharges.toll}
                  onChange={(e) => patchExtra({ toll: Number(e.target.value) || 0 })}
                />
              </Field>
              <Field label="Parking Charges">
                <TextInput
                  type="number"
                  value={pricing.extraCharges.parking}
                  onChange={(e) => patchExtra({ parking: Number(e.target.value) || 0 })}
                />
              </Field>
              <Field label="Extra Km Rate" hint="Used when extra kilometres are added">
                <TextInput
                  type="number"
                  value={pricing.extraCharges.extraKm}
                  onChange={(e) => patchExtra({ extraKm: Number(e.target.value) || 0 })}
                />
              </Field>
            </div>
          </Card>

          <Card title="Calculator Settings" subtitle="Control the public tour cost calculator">
            <div className="space-y-4">
              <label className="flex items-center justify-between gap-3 rounded-xl border border-slate-200 p-4">
                <span>
                  <span className="block text-sm font-bold text-slate-800">Enable Calculator</span>
                  <span className="block text-[11px] text-slate-400">Show the tour cost calculator on the website</span>
                </span>
                <input
                  type="checkbox"
                  checked={pricing.calculator.enabled}
                  onChange={(e) => patchCalculator({ enabled: e.target.checked })}
                  className="h-5 w-5 accent-blue-600"
                />
              </label>
              <div className="grid sm:grid-cols-2 gap-4">
                <Field label="Default Vehicle">
                  <Select
                    value={pricing.calculator.defaultVehicle}
                    onChange={(e) => patchCalculator({ defaultVehicle: e.target.value })}
                  >
                    <option value="">Select default vehicle</option>
                    {vehicleNames.map((n) => (
                      <option key={n} value={n}>
                        {n}
                      </option>
                    ))}
                  </Select>
                </Field>
                <Field label="Default Trip Type">
                  <Select
                    value={pricing.calculator.defaultTripType}
                    onChange={(e) => patchCalculator({ defaultTripType: e.target.value as "One Way" | "Round Trip" })}
                  >
                    <option value="One Way">One Way</option>
                    <option value="Round Trip">Round Trip</option>
                  </Select>
                </Field>
                <Field label="Currency">
                  <Select
                    value={pricing.calculator.currency}
                    onChange={(e) => patchCalculator({ currency: e.target.value })}
                  >
                    <option value="INR">INR (₹)</option>
                    <option value="USD">USD ($)</option>
                    <option value="EUR">EUR (€)</option>
                  </Select>
                </Field>
                <Field label="Minimum Fare">
                  <TextInput
                    type="number"
                    value={pricing.calculator.minFare}
                    onChange={(e) => patchCalculator({ minFare: Number(e.target.value) || 0 })}
                  />
                </Field>
              </div>
            </div>
          </Card>
        </div>
      )}

      <Modal
        open={vehicleModal}
        onClose={() => setVehicleModal(false)}
        title={editingVehicle ? `Edit Vehicle - ${editingVehicle.name}` : "Add Vehicle Pricing"}
        subtitle="Rate card used by the calculator"
        wide
        footer={
          <>
            <button className="adm-btn adm-btn-ghost" onClick={() => setVehicleModal(false)}>
              Cancel
            </button>
            <button className="adm-btn adm-btn-primary" onClick={saveVehicle}>
              {editingVehicle ? "Save Changes" : "Add Vehicle"}
            </button>
          </>
        }
      >
        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Vehicle Name" required>
            <TextInput
              value={vehicleForm.name}
              onChange={(e) => setVehicleForm({ ...vehicleForm, name: e.target.value })}
              placeholder="e.g. Swift Dzire"
              list="pricing-vehicle-names"
            />
            <datalist id="pricing-vehicle-names">
              {vehicleNames.map((n) => (
                <option key={n} value={n} />
              ))}
            </datalist>
          </Field>
          <Field label="Type">
            <Select value={vehicleForm.type} onChange={(e) => setVehicleForm({ ...vehicleForm, type: e.target.value })}>
              {VEHICLE_TYPES.map((t) => (
                <option key={t}>{t}</option>
              ))}
            </Select>
          </Field>
          <Field label="Seating Capacity">
            <TextInput
              type="number"
              min={1}
              value={vehicleForm.capacity}
              onChange={(e) => setVehicleForm({ ...vehicleForm, capacity: Number(e.target.value) || 1 })}
            />
          </Field>
          <Field label="Status">
            <Select
              value={vehicleForm.status}
              onChange={(e) => setVehicleForm({ ...vehicleForm, status: e.target.value as "active" | "inactive" })}
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </Select>
          </Field>
          <Field label="Base Fare (₹)">
            <TextInput
              type="number"
              value={vehicleForm.baseFare}
              onChange={(e) => setVehicleForm({ ...vehicleForm, baseFare: Number(e.target.value) || 0 })}
            />
          </Field>
          <Field label="Per Km Rate (₹)">
            <TextInput
              type="number"
              value={vehicleForm.perKm}
              onChange={(e) => setVehicleForm({ ...vehicleForm, perKm: Number(e.target.value) || 0 })}
            />
          </Field>
          <Field label="Per Day Rate (₹)">
            <TextInput
              type="number"
              value={vehicleForm.perDay}
              onChange={(e) => setVehicleForm({ ...vehicleForm, perDay: Number(e.target.value) || 0 })}
            />
          </Field>
          <Field label="Extra Km Rate (₹)">
            <TextInput
              type="number"
              value={vehicleForm.extraKmRate}
              onChange={(e) => setVehicleForm({ ...vehicleForm, extraKmRate: Number(e.target.value) || 0 })}
            />
          </Field>
          <Field label="Driver Charge / day (₹)">
            <TextInput
              type="number"
              value={vehicleForm.driverCharge}
              onChange={(e) => setVehicleForm({ ...vehicleForm, driverCharge: Number(e.target.value) || 0 })}
            />
          </Field>
        </div>
      </Modal>

      <Modal
        open={destinationModal}
        onClose={() => setDestinationModal(false)}
        title={editingDestination ? `Edit - ${editingDestination.name}` : "Add Destination Pricing"}
        subtitle="Distance and route prices"
        wide
        footer={
          <>
            <button className="adm-btn adm-btn-ghost" onClick={() => setDestinationModal(false)}>
              Cancel
            </button>
            <button className="adm-btn adm-btn-primary" onClick={saveDestination}>
              {editingDestination ? "Save Changes" : "Add Destination"}
            </button>
          </>
        }
      >
        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Destination Name" required>
            <TextInput
              value={destinationForm.name}
              onChange={(e) => setDestinationForm({ ...destinationForm, name: e.target.value })}
              placeholder="e.g. Mumbai"
            />
          </Field>
          <Field label="Starting Point">
            <TextInput
              value={destinationForm.from}
              onChange={(e) => setDestinationForm({ ...destinationForm, from: e.target.value })}
              placeholder="e.g. Shirdi"
            />
          </Field>
          <Field label="Distance (km)">
            <TextInput
              type="number"
              value={destinationForm.distance}
              onChange={(e) => setDestinationForm({ ...destinationForm, distance: Number(e.target.value) || 0 })}
            />
          </Field>
          <Field label="Status">
            <Select
              value={destinationForm.status}
              onChange={(e) => setDestinationForm({ ...destinationForm, status: e.target.value as "active" | "inactive" })}
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </Select>
          </Field>
          <Field label="One Way Price (₹)">
            <TextInput
              type="number"
              value={destinationForm.oneWay}
              onChange={(e) => setDestinationForm({ ...destinationForm, oneWay: Number(e.target.value) || 0 })}
            />
          </Field>
          <Field label="Round Trip Price (₹)">
            <TextInput
              type="number"
              value={destinationForm.roundTrip}
              onChange={(e) => setDestinationForm({ ...destinationForm, roundTrip: Number(e.target.value) || 0 })}
            />
          </Field>
          <Field label="Per Day Price (₹)">
            <TextInput
              type="number"
              value={destinationForm.perDay}
              onChange={(e) => setDestinationForm({ ...destinationForm, perDay: Number(e.target.value) || 0 })}
            />
          </Field>
          <Field label="Additional Charge (₹)">
            <TextInput
              type="number"
              value={destinationForm.additionalCharge}
              onChange={(e) => setDestinationForm({ ...destinationForm, additionalCharge: Number(e.target.value) || 0 })}
            />
          </Field>
        </div>
      </Modal>

      <ConfirmDialog
        open={!!vehicleToDelete}
        onClose={() => setVehicleToDelete(null)}
        onConfirm={confirmVehicleDelete}
        title="Delete Vehicle Pricing"
        message={`Remove "${vehicleToDelete?.name ?? ""}" from the rate card?`}
      />
      <ConfirmDialog
        open={!!destinationToDelete}
        onClose={() => setDestinationToDelete(null)}
        onConfirm={confirmDestinationDelete}
        title="Delete Destination Pricing"
        message={`Remove "${destinationToDelete?.name ?? ""}" from destination pricing?`}
      />
    </div>
  );
}
