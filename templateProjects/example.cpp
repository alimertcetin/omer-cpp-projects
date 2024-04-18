#include <iostream>

#define log(x) std::cout << x << std::endl

int main(int argc, char* argv[])
{
  for(int i = 0; i < argc; i++)
    {
      std::cout << "Argument " << i << ": " << argv[i] << std::endl;
    }
}
