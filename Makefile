# Automatically generate lists of sources using wildcards.
C_SOURCES = $(wildcard kernel/*.c drivers/*.c)
HEADERS = $(wildcard kernel/*.h drivers/*.h)

# TODO: Make sources depend on all header files.
# Convert the *.c filenames to *.o to give a list of object files to build.
OBJ = $(C_SOURCES:.c=.o)

# Default build target.
all: os-image

# Run QEMU to simulate booting of our code.
run: all
	qemu-system-x86_64 -fda os-image

# This is the actual disk image that the computer loads,
# which is the combination of our compiled bootsector and kernel.
os-image: boot/boot_sect.bin kernel/kernel.bin
	cat $^ > os-image

# This builds the binary of our kernel from two object files:
# - the kernel_entry, which jumps to main() in our kernel.
# - the compiled C kernel.
kernel/kernel.bin: kernel/kernel_entry.o $(OBJ)
	ld -m elf_i386 -o $@ -Ttext=0x1000 $^ --oformat binary

# Generic rule for compiling C code to an object file.
# For simplicity, the C files depend on all header files.
%.o: %.c $(HEADERS)
	gcc -m32 -ffreestanding -c -fno-pie $< -o $@

# Assemble the kernel_entry.
%.o: %.asm
	nasm $< -f elf32 -o $@

# Assemble .asm files into .bin.
%.bin: %.asm
	nasm $< -f bin -I '../../boot/' -o $@

# Clean up build artifacts.
clean:
	rm -f *.bin *.dis *.o os-image
	rm -f kernel/*.o boot/*.bin drivers/*.o
