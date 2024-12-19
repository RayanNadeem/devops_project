import os

path= os.getcwd()
bpath="boot_sect"
img_name = "os-image"
def c_to_o(folder, file):
    os.system(f"gcc -m32 -ffreestanding -c -fno-pie ./{folder}/{file}.c -o {folder}/{file}.o")

folder = "boot"
os.system(f"nasm {folder}/{bpath}.asm -f bin -o {folder}/{bpath}.bin")
os.system(f"od -t x1 -A n {folder}/{bpath}.bin")

folder = "kernel"
c_to_o(folder, "kernel")
os.system(f"nasm {folder}/kernel_entry.asm -f elf32 -o {folder}/kernel_entry.o")
os.system(f"ld -m elf_i386 -o {folder}/kernel.bin -Ttext=0x1000 {folder}/kernel_entry.o {folder}/kernel.o --oformat binary")
os.system(f"cat boot/{bpath}.bin {folder}/kernel.bin > {img_name}")
os.system(f"qemu-system-x86_64 -fda {img_name}")