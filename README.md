# Factorial API

A simple factorial API that calculates the factorial using either a single or
multiple threads. This was created to get practice with using worker_threads
to manage the workload of CPU intensive tasks.

Benchmarking factorials of small numbers reveal no significant differences in
compute time up to a certain point. Single threading actually outperforms
multithreading at small factorials which I believe is due to the overhead to
setup worker threads. This overhead becomes negligable as factorial numbers
increase. For example, factorial of 100,000 shows multithreading completing its
computation about 2 seconds earlier than single threading.
