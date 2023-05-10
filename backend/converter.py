with open('new.txt', 'r') as f:
    lines = f.readlines()

new_lines = []
for line in lines:
    cols = line.strip().split('\t')
    if cols[2] in {'i', 'x'}:
        cols[2] = '-'
    new_line = '\t'.join(cols) + '\n'
    new_lines.append(new_line)

with open('comb.txt', 'w') as f:
    f.writelines(new_lines)
