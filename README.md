<h1 align="center" >
mongoose-auto-ts
</h1>
<br/><br/><br/>

### Installation:

```sh
npm i ts-benchmark -g
```

### Description:

A command line interface for monitoring the performance of typescript.

Features:

- Ability to specify specific fields of benchmark result.
- Watcher which trigger benchmark process on any change made to the specified path.
- It can be use to benchmark two different branches.

---

<br/>

### Usage:

Benchmark the current directory:

```shell

ts-benchmark

```

Benchmark test folder which is test project and watch changes on src folder to trigger benchmark:

```shell

ts-benchmark -p ./test -w ./src

```

Same previous command but it will shows specific fields of benchmark result instead of all <a href="#fields">fields</a>:

```shell

ts-benchmark -p ./test -w ./src -f 17 18 29 32

```

Benchmark test folder watch changes on src folder after benchmark master branch:

```shell

ts-benchmark -p ./test -w ./src -b master

```

<br/>

### Options:

<Table>
<thead>
<tr>
<th>option</th>
<th>description</th>
<th>type</th>
<th>default</th>
</tr>
</thead>
<tbody>
<tr>
<td>-p, --path</td>
<td>A relative path to project that will be benchmarked.</td>
<td>string</td>
<td>./</td>
</tr>
<tr>
<td>-w, --watch</td>
<td>A relative path to a directory or a file that trigger benchmark process on any changes.</td>
<td>string</td>
<td>undefined</td>
</tr>
<tr>
<td>-b, --branch</td>
<td>Another git branch name to be benchmarked and compared with the current branch.</td>
<td>string</td>
<td>undefined</td>
</tr>
<tr>
<td>-s, --save</td>
<td>To save and show the previous benchmark result.</td>
<td>boolean</td>
<td>false</td>
</tr>
<tr>
<td>-i, --initial</td>
<td>To save and show the initial benchmark result.</td>
<td>boolean</td>
<td>false</td>
</tr>
<tr>
<td>-f, --fields</td>
<td>To pick and show specific fields of benchmark result by its index numbers.</td>
<td>array of index numbers between 1-32</td>
<td>undefined</td>
</tr>
<tr>
<td>--help</td>
<td>Show help</td>
<td>boolean</td>
<td>false</td>
</tr>
<tr>
<td>--version</td>
<td>Show version</td>
<td>boolean</td>
<td>false</td>
</tr>
</tbody>
</Table>

<br/>

<h5 id="fields">Fields indexes:</h5>
<Table>
<thead>
<tr>
<th>index</th>
<th>field</th>
<th>index</th>
<th>field</th>
<th>index</th>
<th>field</th>
</tr>
</thead>
<tbody>
<tr>
<td>1</td>
<td>Files</td>
<td>2</td>
<td>Lines of Library</td>
<td>3</td>
<td>Lines of Definitions</td>
</tr>
<tr>
<td>4</td>
<td>Lines of TypeScript</td>
<td>5</td>
<td>Lines of JavaScript</td>
<td>6</td>
<td>Lines of JSON</td>
</tr>
<tr>
<td>7</td>
<td>Lines of Other</td>
<td>8</td>
<td>Nodes of Library</td>
<td>9</td>
<td>Nodes of Definitions</td>
</tr>
<tr>
<td>10</td>
<td>Nodes of TypeScript</td>
<td>11</td>
<td>Nodes of JavaScript</td>
<td>12</td>
<td>Nodes of JSON</td>
</tr>
<tr>
<td>13</td>
<td>Nodes of Other</td>
<td>14</td>
<td>Identifiers</td>
<td>15</td>
<td>Symbols</td>
</tr>
<tr>
<td>16</td>
<td>Types</td>
<td>17</td>
<td>Instantiations</td>
<td>18</td>
<td>Memory used</td>
</tr>
<tr>
<td>19</td>
<td>Assignability cache size</td>
<td>20</td>
<td>Identity cache size</td>
<td>21</td>
<td>Subtype cache size</td>
</tr>
<tr>
<td>22</td>
<td>Strict subtype cache size</td>
<td>23</td>
<td>I/O Read time</td>
<td>24</td>
<td>Parse time</td>
</tr>
<tr>
<td>25</td>
<td>ResolveModule time</td>
<td>26</td>
<td>ResolveTypeReference time</td>
<td>27</td>
<td>Program time</td>
</tr>
<tr>
<td>28</td>
<td>Bind time</td>
<td>29</td>
<td>Check time</td>
<td>30</td>
<td>printTime time</td>
</tr>
<tr>
<td>31</td>
<td>Emit time</td>
<td>32</td>
<td>Total time</td>
</tr>
</tbody>
</Table>
