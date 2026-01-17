"use client";

import { useState } from "react";
import { Header } from "@/components/Header";
import { Card, CardContent, CardHeader } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/label";
import { RescueBag } from "@/lib/types";
import { mockRescueBags, formatCurrency, getCategoryLabel, formatTime } from "@/lib/mockData";
import { Plus, Clock, Package, Pencil, Trash2, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

export default function RescueBagsPage() {
    const [bags, setBags] = useState<RescueBag[]>(mockRescueBags);
    const [isAddOpen, setIsAddOpen] = useState(false);
    const [editingBag, setEditingBag] = useState<RescueBag | null>(null);

    // Form state for new bag
    const [newBag, setNewBag] = useState({
        name: "",
        category: "mixed_bakery",
        description: "",
        quantity: 5,
        price: 100,
        originalValue: 350,
        pickupStart: "19:00",
        pickupEnd: "20:30"
    });

    const handleAddBag = () => {
        const bag: RescueBag = {
            id: `b${Date.now()}`,
            merchantId: "m1",
            merchantName: "Baker's Oven",
            name: newBag.name || "Surprise Bag",
            category: newBag.category as RescueBag["category"],
            description: newBag.description,
            quantity: newBag.quantity,
            quantityRemaining: newBag.quantity,
            price: newBag.price,
            originalValue: newBag.originalValue,
            pickupStart: `2026-01-17T${newBag.pickupStart}:00`,
            pickupEnd: `2026-01-17T${newBag.pickupEnd}:00`,
            status: "available",
            createdAt: new Date().toISOString()
        };
        setBags([...bags, bag]);
        setIsAddOpen(false);
        setNewBag({
            name: "",
            category: "mixed_bakery",
            description: "",
            quantity: 5,
            price: 100,
            originalValue: 350,
            pickupStart: "19:00",
            pickupEnd: "20:30"
        });
    };

    const handleMarkSoldOut = (bagId: string) => {
        setBags(bags.map(b =>
            b.id === bagId ? { ...b, status: "sold_out" as const, quantityRemaining: 0 } : b
        ));
    };

    const handleRestore = (bagId: string) => {
        setBags(bags.map(b => {
            if (b.id === bagId) {
                return { ...b, status: "available" as const, quantityRemaining: b.quantity };
            }
            return b;
        }));
    };

    const handleDeleteBag = (bagId: string) => {
        setBags(bags.filter(b => b.id !== bagId));
    };

    const handleEditBag = () => {
        if (!editingBag) return;
        // If quantity remaining was updated, also update status
        const updatedBag = {
            ...editingBag,
            status: editingBag.quantityRemaining > 0 ? "available" as const : "sold_out" as const
        };
        setBags(bags.map(b =>
            b.id === editingBag.id ? updatedBag : b
        ));
        setEditingBag(null);
    };

    const handleAdjustQuantity = (bagId: string, delta: number) => {
        setBags(bags.map(b => {
            if (b.id === bagId) {
                const newRemaining = Math.max(0, Math.min(b.quantity, b.quantityRemaining + delta));
                return {
                    ...b,
                    quantityRemaining: newRemaining,
                    status: newRemaining > 0 ? "available" : "sold_out"
                };
            }
            return b;
        }));
    };

    const availableBags = bags.filter(b => b.status === 'available');
    const soldOutBags = bags.filter(b => b.status === 'sold_out');

    return (
        <>
            <Header
                title="Rescue Bags"
                subtitle="Manage today's surplus food"
            />

            <div className="p-6 space-y-6">
                {/* Quick Stats - Standardized with other pages */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    <Card className="bg-spare-bg-light border-white/5">
                        <CardContent className="p-5">
                            <p className="text-sm text-muted-foreground font-serif mb-2">Total Bags</p>
                            <p className="text-2xl font-bold text-white">{bags.length}</p>
                        </CardContent>
                    </Card>
                    <Card className="bg-spare-bg-light border-white/5">
                        <CardContent className="p-5">
                            <p className="text-sm text-muted-foreground font-serif mb-2">Available</p>
                            <p className="text-2xl font-bold text-accent">{availableBags.length}</p>
                        </CardContent>
                    </Card>
                    <Card className="bg-spare-bg-light border-white/5">
                        <CardContent className="p-5">
                            <p className="text-sm text-muted-foreground font-serif mb-2">Sold Out</p>
                            <p className="text-2xl font-bold text-blue-400">{soldOutBags.length}</p>
                        </CardContent>
                    </Card>
                    <Card className="bg-spare-bg-light border-white/5">
                        <CardContent className="p-5">
                            <p className="text-sm text-muted-foreground font-serif mb-2">Sold Today</p>
                            <p className="text-2xl font-bold text-pink">
                                {bags.reduce((acc, b) => acc + b.quantity - b.quantityRemaining, 0)}
                            </p>
                        </CardContent>
                    </Card>
                </div>

                {/* Add Button */}
                <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
                    <DialogTrigger asChild>
                        <Button className="bg-pink hover:bg-pink-hover text-spare-bg font-semibold">
                            <Plus className="w-4 h-4 mr-2" />
                            Add New Bag
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="bg-spare-bg-light border-white/10 text-white max-w-md">
                        <DialogHeader>
                            <DialogTitle className="text-pink">Add New Rescue Bag</DialogTitle>
                            <DialogDescription className="text-muted-foreground font-serif">
                                Create a new bag for today
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="grid gap-2">
                                <Label htmlFor="name" className="font-serif text-muted-foreground text-xs">Bag Name</Label>
                                <Input
                                    id="name"
                                    value={newBag.name}
                                    onChange={(e) => setNewBag({ ...newBag, name: e.target.value })}
                                    placeholder="e.g. Evening Surprise Bag"
                                    className="bg-spare-bg border-white/10 text-white"
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="category" className="font-serif text-muted-foreground text-xs">Category</Label>
                                <select
                                    id="category"
                                    value={newBag.category}
                                    onChange={(e) => setNewBag({ ...newBag, category: e.target.value })}
                                    className="flex h-10 w-full rounded-md border border-white/10 bg-spare-bg px-3 py-2 text-sm text-white"
                                >
                                    <option value="mixed_bakery">Mixed Bakery</option>
                                    <option value="pastries">Pastries</option>
                                    <option value="breads">Breads</option>
                                    <option value="snacks">Snacks</option>
                                </select>
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="description" className="font-serif text-muted-foreground text-xs">Description</Label>
                                <Input
                                    id="description"
                                    value={newBag.description}
                                    onChange={(e) => setNewBag({ ...newBag, description: e.target.value })}
                                    placeholder="What's in the bag?"
                                    className="bg-spare-bg border-white/10 text-white"
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="price" className="font-serif text-muted-foreground text-xs">Sale Price (₹)</Label>
                                    <Input
                                        id="price"
                                        type="number"
                                        value={newBag.price}
                                        onChange={(e) => setNewBag({ ...newBag, price: parseInt(e.target.value) || 0 })}
                                        className="bg-spare-bg border-white/10 text-white"
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="originalValue" className="font-serif text-muted-foreground text-xs">Original Value (₹)</Label>
                                    <Input
                                        id="originalValue"
                                        type="number"
                                        value={newBag.originalValue}
                                        onChange={(e) => setNewBag({ ...newBag, originalValue: parseInt(e.target.value) || 0 })}
                                        className="bg-spare-bg border-white/10 text-white"
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="quantity" className="font-serif text-muted-foreground text-xs">Quantity</Label>
                                    <Input
                                        id="quantity"
                                        type="number"
                                        value={newBag.quantity}
                                        onChange={(e) => setNewBag({ ...newBag, quantity: parseInt(e.target.value) || 1 })}
                                        className="bg-spare-bg border-white/10 text-white"
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <Label className="font-serif text-muted-foreground text-xs">Pickup Window</Label>
                                    <div className="flex gap-2 items-center">
                                        <Input
                                            type="time"
                                            value={newBag.pickupStart}
                                            onChange={(e) => setNewBag({ ...newBag, pickupStart: e.target.value })}
                                            className="bg-spare-bg border-white/10 text-white text-xs"
                                        />
                                        <span className="text-muted-foreground">-</span>
                                        <Input
                                            type="time"
                                            value={newBag.pickupEnd}
                                            onChange={(e) => setNewBag({ ...newBag, pickupEnd: e.target.value })}
                                            className="bg-spare-bg border-white/10 text-white text-xs"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <DialogFooter>
                            <Button variant="outline" onClick={() => setIsAddOpen(false)} className="border-white/10 text-white hover:bg-white/5">
                                Cancel
                            </Button>
                            <Button onClick={handleAddBag} className="bg-pink hover:bg-pink-hover text-spare-bg">
                                Add Bag
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>

                {/* Edit Dialog */}
                <Dialog open={!!editingBag} onOpenChange={(open) => !open && setEditingBag(null)}>
                    <DialogContent className="bg-spare-bg-light border-white/10 text-white max-w-md">
                        <DialogHeader>
                            <DialogTitle className="text-pink">Edit Rescue Bag</DialogTitle>
                            <DialogDescription className="text-muted-foreground font-serif">
                                Update bag details
                            </DialogDescription>
                        </DialogHeader>
                        {editingBag && (
                            <div className="grid gap-4 py-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="edit-name" className="font-serif text-muted-foreground text-xs">Bag Name</Label>
                                    <Input
                                        id="edit-name"
                                        value={editingBag.name}
                                        onChange={(e) => setEditingBag({ ...editingBag, name: e.target.value })}
                                        className="bg-spare-bg border-white/10 text-white"
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="edit-category" className="font-serif text-muted-foreground text-xs">Category</Label>
                                    <select
                                        id="edit-category"
                                        value={editingBag.category}
                                        onChange={(e) => setEditingBag({ ...editingBag, category: e.target.value as RescueBag["category"] })}
                                        className="flex h-10 w-full rounded-md border border-white/10 bg-spare-bg px-3 py-2 text-sm text-white"
                                    >
                                        <option value="mixed_bakery">Mixed Bakery</option>
                                        <option value="pastries">Pastries</option>
                                        <option value="breads">Breads</option>
                                        <option value="snacks">Snacks</option>
                                    </select>
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="edit-description" className="font-serif text-muted-foreground text-xs">Description</Label>
                                    <Input
                                        id="edit-description"
                                        value={editingBag.description || ""}
                                        onChange={(e) => setEditingBag({ ...editingBag, description: e.target.value })}
                                        className="bg-spare-bg border-white/10 text-white"
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="grid gap-2">
                                        <Label htmlFor="edit-price" className="font-serif text-muted-foreground text-xs">Sale Price (₹)</Label>
                                        <Input
                                            id="edit-price"
                                            type="number"
                                            value={editingBag.price}
                                            onChange={(e) => setEditingBag({ ...editingBag, price: parseInt(e.target.value) || 0 })}
                                            className="bg-spare-bg border-white/10 text-white"
                                        />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="edit-originalValue" className="font-serif text-muted-foreground text-xs">Original Value (₹)</Label>
                                        <Input
                                            id="edit-originalValue"
                                            type="number"
                                            value={editingBag.originalValue}
                                            onChange={(e) => setEditingBag({ ...editingBag, originalValue: parseInt(e.target.value) || 0 })}
                                            className="bg-spare-bg border-white/10 text-white"
                                        />
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="grid gap-2">
                                        <Label htmlFor="edit-quantity" className="font-serif text-muted-foreground text-xs">Total Quantity</Label>
                                        <Input
                                            id="edit-quantity"
                                            type="number"
                                            value={editingBag.quantity}
                                            onChange={(e) => setEditingBag({ ...editingBag, quantity: parseInt(e.target.value) || 0 })}
                                            className="bg-spare-bg border-white/10 text-white"
                                        />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="edit-remaining" className="font-serif text-muted-foreground text-xs">Remaining</Label>
                                        <Input
                                            id="edit-remaining"
                                            type="number"
                                            value={editingBag.quantityRemaining}
                                            onChange={(e) => setEditingBag({ ...editingBag, quantityRemaining: parseInt(e.target.value) || 0 })}
                                            className="bg-spare-bg border-white/10 text-white"
                                        />
                                    </div>
                                </div>
                            </div>
                        )}
                        <DialogFooter>
                            <Button variant="outline" onClick={() => setEditingBag(null)} className="border-white/10 text-white hover:bg-white/5">
                                Cancel
                            </Button>
                            <Button onClick={handleEditBag} className="bg-pink hover:bg-pink-hover text-spare-bg">
                                Save Changes
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>

                {/* Bags Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {bags.map((bag) => (
                        <Card key={bag.id} className="bg-spare-bg-light border-white/5">
                            <CardHeader className="pb-3">
                                <div className="flex items-start justify-between gap-2">
                                    <div>
                                        {/* Bag name - prominent, pink */}
                                        <h3 className="text-lg font-semibold text-pink">{bag.name}</h3>
                                        {/* Category - serif label */}
                                        <p className="text-sm text-muted-foreground font-serif">{getCategoryLabel(bag.category)}</p>
                                    </div>
                                    <Badge
                                        variant={bag.status === 'available' ? 'default' : 'secondary'}
                                        className={
                                            bag.status === 'available'
                                                ? 'bg-accent/20 text-accent border-0'
                                                : 'bg-blue-500/20 text-blue-400 border-0'
                                        }
                                    >
                                        {bag.status === 'available' ? 'Available' : 'Sold Out'}
                                    </Badge>
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {bag.description && (
                                    <p className="text-sm text-muted-foreground">{bag.description}</p>
                                )}

                                <div className="space-y-4">
                                    {/* Detailed Inventory Control */}
                                    <div className="flex items-center justify-between p-3 rounded-lg bg-spare-bg border border-white/5">
                                        <div className="flex flex-col">
                                            <span className="font-serif text-[10px] uppercase tracking-wider text-muted-foreground mb-1">Inventory Left</span>
                                            <div className="flex items-center gap-1">
                                                <span className={cn("text-lg font-bold leading-none", bag.quantityRemaining === 0 ? "text-pink" : "text-white")}>
                                                    {bag.quantityRemaining}
                                                </span>
                                                <span className="text-muted-foreground text-xs">/ {bag.quantity} total</span>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <button
                                                onClick={() => handleAdjustQuantity(bag.id, -1)}
                                                className="w-8 h-8 rounded-lg flex items-center justify-center bg-white/5 hover:bg-white/10 text-white transition-colors"
                                            >
                                                <Minus className="w-4 h-4" />
                                            </button>
                                            <button
                                                onClick={() => handleAdjustQuantity(bag.id, 1)}
                                                className="w-8 h-8 rounded-lg flex items-center justify-center bg-white/5 hover:bg-white/10 text-white transition-colors"
                                            >
                                                <Plus className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between px-1">
                                        <div className="flex flex-col">
                                            <span className="font-serif text-[10px] uppercase tracking-wider text-muted-foreground mb-0.5">Pickup Window</span>
                                            <span className="text-sm font-medium text-white">{formatTime(bag.pickupStart)} - {formatTime(bag.pickupEnd)}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Pricing - serif labels, sans values */}
                                <div className="flex items-center justify-between pt-4 border-t border-white/5">
                                    <div>
                                        <p className="font-serif text-[10px] uppercase tracking-wider text-muted-foreground mb-1">Price</p>
                                        <div className="flex items-center gap-2">
                                            <span className="text-xl font-bold text-accent">
                                                {formatCurrency(bag.price)}
                                            </span>
                                            <span className="text-sm text-muted-foreground line-through opacity-50">
                                                {formatCurrency(bag.originalValue)}
                                            </span>
                                        </div>
                                    </div>
                                    <Badge className="bg-pink/20 text-pink border-0 font-semibold">
                                        {Math.round((1 - bag.price / bag.originalValue) * 100)}% off
                                    </Badge>
                                </div>

                                <div className="flex gap-2 pt-2">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="flex-1 border-white/5 bg-white/5 text-white hover:bg-white/10"
                                        onClick={() => setEditingBag(bag)}
                                    >
                                        <Pencil className="w-3 h-3 mr-1.5" />
                                        Edit
                                    </Button>
                                    {bag.status === 'available' && bag.quantityRemaining > 0 ? (
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            className="flex-1 border-pink/30 text-pink hover:bg-pink/10"
                                            onClick={() => handleMarkSoldOut(bag.id)}
                                        >
                                            Sold Out
                                        </Button>
                                    ) : (
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            className="flex-1 border-accent/30 text-accent hover:bg-accent/10"
                                            onClick={() => handleRestore(bag.id)}
                                        >
                                            Restore
                                        </Button>
                                    )}
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className="text-white/20 hover:text-red-500 hover:bg-red-500/10"
                                        onClick={() => handleDeleteBag(bag.id)}
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {bags.length === 0 && (
                    <Card className="bg-spare-bg-light border-white/5">
                        <CardContent className="py-12 text-center">
                            <Package className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                            <p className="text-muted-foreground">No rescue bags yet. Add your first one!</p>
                        </CardContent>
                    </Card>
                )}
            </div>
        </>
    );
}
