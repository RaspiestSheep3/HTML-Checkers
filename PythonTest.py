grid = []

for i in range(8):
    grid.append([0] * 8)

for j in range(len(grid)):
    for k in range(len(grid[j])):
        total = j + k
        total = total % 2
        grid[j][k] = total

print(grid)
